// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol';
import '@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol';
import '../PictureRequest.sol';
import '../RequestSubmission.sol';
import '../RequestComment.sol';
import '../PriceOracle.sol';

contract BaseFixMyPicFactory is Initializable, ReentrancyGuardUpgradeable {
  address public priceOracle;

  event PictureRequestCreated(
    address indexed request,
    string title,
    string description,
    string imageId,
    uint256 budget,
    address indexed creator,
    uint256 createdAt,
    uint256 expiresAt
  );

  event RequestSubmissionCreated(
    address indexed submission,
    address indexed request,
    string description,
    uint256 price,
    string freeImageId,
    string watermarkedImageId,
    string encryptedImageId,
    address indexed submitter,
    uint256 createdAt
  );

  event RequestCommentCreated(
    address indexed comment,
    address indexed request,
    string text,
    address indexed commenter,
    uint256 createdAt
  );

  event SubmissionPurchased(address indexed submission, address indexed purchaser, uint256 price, uint256 purchaseDate);

  function initialize(address _priceOracle) public initializer {
    priceOracle = _priceOracle;
  }

  function createPictureRequest(
    string calldata _title,
    string calldata _description,
    string calldata _imageId,
    uint256 _budget,
    uint256 _expiresAt
  ) external {
    PictureRequest pictureRequest = new PictureRequest();
    pictureRequest.initialize(_title, _description, _imageId, _budget, msg.sender, _expiresAt);

    emit PictureRequestCreated(
      address(pictureRequest),
      _title,
      _description,
      _imageId,
      _budget,
      msg.sender,
      block.timestamp,
      _expiresAt
    );
  }

  function createRequestSubmission(
    address _request,
    string calldata _description,
    uint256 _price,
    string calldata _freeImageId,
    string calldata _watermarkedImageId,
    string calldata _encryptedImageId
  ) external {
    PictureRequest pictureRequest = PictureRequest(_request);
    uint256 expiresAt = pictureRequest.expiresAt();
    require(expiresAt == 0 || block.timestamp <= expiresAt, 'PictureRequest has expired');

    RequestSubmission requestSubmission = new RequestSubmission();
    requestSubmission.initialize(
      _request,
      _description,
      _price,
      _freeImageId,
      _watermarkedImageId,
      _encryptedImageId,
      msg.sender,
      priceOracle
    );

    emit RequestSubmissionCreated(
      address(requestSubmission),
      _request,
      _description,
      _price,
      _freeImageId,
      _watermarkedImageId,
      _encryptedImageId,
      msg.sender,
      block.timestamp
    );
  }

  function createRequestComment(address _request, string calldata _text) external {
    require(PictureRequest(_request).isPictureRequest(), 'PictureRequest does not exist');

    RequestComment comment = new RequestComment();
    comment.initialize(_request, _text, msg.sender);

    emit RequestCommentCreated(address(comment), _request, _text, msg.sender, block.timestamp);
  }

  function purchaseSubmission(address _submission) external payable nonReentrant {
    require(_submission != address(0), 'Invalid submission address');

    RequestSubmission requestSubmission = RequestSubmission(_submission);

    uint256 priceInWei = requestSubmission.getPriceInWei();

    require(msg.value >= priceInWei, 'Insufficient payment');

    requestSubmission.markAsPurchased(msg.sender);

    (bool success, ) = requestSubmission.submitter().call{value: msg.value}('');
    require(success, 'Payment failed');

    emit SubmissionPurchased(_submission, msg.sender, msg.value, block.timestamp);
  }
}
