// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol';
import '@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol';
import '../PriceOracle.sol';

contract BaseRequestSubmission is Initializable, ReentrancyGuardUpgradeable {
  event SubmissionPurchased(address indexed submission, address indexed purchaser, uint256 price, uint256 purchaseDate);

  address public request;
  address public submitter;
  uint256 public price;
  string public description;
  uint256 public createdAt;
  string public freeImageId;
  string public encryptedImageId;
  string public watermarkedImageId;
  mapping(address => bool) public submissionPurchasers;

  PriceOracle internal priceOracle;

  error InsufficientPayment(uint256 required, uint256 provided);
  error AlreadyPurchased(address submission, address sender);
  error PaymentFailed(address submission, address sender, uint256 value);

  function initialize(
    address _request,
    string calldata _description,
    uint256 _price,
    string calldata _freeImageId,
    string calldata _watermarkedImageId,
    string calldata _encryptedImageId,
    address _submitter,
    address _priceOracle
  ) external initializer {
    __ReentrancyGuard_init();

    request = _request;
    description = _description;
    price = _price;
    freeImageId = _freeImageId;
    watermarkedImageId = _watermarkedImageId;
    encryptedImageId = _encryptedImageId;
    submitter = _submitter;
    createdAt = block.timestamp;
    priceOracle = PriceOracle(_priceOracle);
  }

  function purchaseSubmission() external payable nonReentrant {
    uint256 ethPriceInUsd = priceOracle.getLatestETHPrice();
    require(ethPriceInUsd > 0, 'ETH price is not available in purchaseSubmission');
    uint256 priceInUsd = price / 1e2; // price is in cents, so we divide by 100 to get USD
    require(priceInUsd > 0, 'Price in USD is not available');
    uint256 priceInWei = (priceInUsd * 1e18) / ethPriceInUsd;
    require(priceInWei > 0, 'Price in Wei is not available');

    // This gives some wiggle room for price fluctuations
    uint256 minimumAcceptedWei = (priceInWei * 99) / 100;
    require(minimumAcceptedWei > 0, 'Minimum accepted Wei is not available');

    if (msg.value < minimumAcceptedWei) {
      revert InsufficientPayment(minimumAcceptedWei, msg.value);
    }
    if (submissionPurchasers[msg.sender]) {
      revert AlreadyPurchased(address(this), msg.sender);
    }

    (bool success, ) = submitter.call{value: msg.value}('');
    if (!success) {
      revert PaymentFailed(address(this), msg.sender, msg.value);
    }

    submissionPurchasers[msg.sender] = true;

    emit SubmissionPurchased(address(this), msg.sender, msg.value, block.timestamp);
  }

  function hasPurchased(address _user) external view returns (bool) {
    return submissionPurchasers[_user];
  }

  function getEncryptedImageId(address _user) external view returns (string memory) {
    require(submissionPurchasers[_user], 'User has not purchased this submission');
    return encryptedImageId;
  }
}
