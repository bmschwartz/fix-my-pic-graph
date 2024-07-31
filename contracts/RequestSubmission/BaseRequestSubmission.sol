// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol';
import '@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol';
import '@chainlink/contracts/src/v0.8/interfaces/FeedRegistryInterface.sol';
import {Denominations} from '@chainlink/contracts/src/v0.8/Denominations.sol';

contract BaseRequestSubmission is Initializable, ReentrancyGuardUpgradeable {
  event SubmissionPurchased(address indexed submission, address indexed purchaser, uint256 purchaseDate);

  address public request;
  address public submitter;
  uint256 public price;
  string public description;
  uint256 public createdAt;
  string public freeImageId;
  string public encryptedImageId;
  string public watermarkedImageId;
  mapping(address => bool) public submissionPurchasers;

  FeedRegistryInterface internal priceFeed;
  address internal ETH_PRICE_FEED_ADDRESS = 0x47Fb2585D2C56Fe188D0E6ec628a38b74fCeeeDf;

  function initialize(
    address _request,
    string calldata _description,
    uint256 _price,
    string calldata _freeImageId,
    string calldata _watermarkedImageId,
    string calldata _encryptedImageId,
    address _submitter
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
    priceFeed = FeedRegistryInterface(ETH_PRICE_FEED_ADDRESS);
  }

  function getLatestETHPrice() public view returns (uint256) {
    (, int ethPrice, , , ) = priceFeed.latestRoundData(Denominations.ETH, Denominations.USD);
    return uint256(ethPrice) * 1e10; // Adjust for decimals
  }

  function purchaseSubmission() external payable nonReentrant {
    uint256 ethPriceInUsd = getLatestETHPrice();
    uint256 priceInWei = (price * 1e18) / ethPriceInUsd;

    require(msg.value >= priceInWei, 'Insufficient payment');
    require(!submissionPurchasers[msg.sender], 'Already purchased');

    (bool success, ) = submitter.call{value: msg.value}('');
    require(success, 'Payment failed');

    submissionPurchasers[msg.sender] = true;

    emit SubmissionPurchased(address(this), msg.sender, block.timestamp);
  }

  function hasPurchased(address _user) external view returns (bool) {
    return submissionPurchasers[_user];
  }

  function getEncryptedImageId(address _user) external view returns (string memory) {
    require(submissionPurchasers[_user], 'User has not purchased this submission');
    return encryptedImageId;
  }
}
