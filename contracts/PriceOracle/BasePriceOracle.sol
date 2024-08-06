// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@chainlink/contracts/src/v0.8/interfaces/FeedRegistryInterface.sol';
import '@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol';
import {Denominations} from '@chainlink/contracts/src/v0.8/Denominations.sol';

contract BasePriceOracle is Initializable {
  FeedRegistryInterface internal priceFeed;
  bool public useFixedPrice;
  uint256 public constant FIXED_PRICE = 1000 * 1e8; // Fixed price in USD with 8 decimals

  function initialize(address _priceFeedAddress) external initializer {
    if (_priceFeedAddress != address(0)) {
      priceFeed = FeedRegistryInterface(_priceFeedAddress);
      useFixedPrice = false;
    } else {
      useFixedPrice = true;
    }
  }

  function getLatestETHPrice() public view returns (uint256) {
    if (useFixedPrice) {
      return FIXED_PRICE;
    }

    (, int256 ethPrice, , , ) = priceFeed.latestRoundData(Denominations.ETH, Denominations.USD);
    require(ethPrice > 0, 'ETH price is not available in getLatestETHPrice');
    return uint256(ethPrice); // Price already comes with 8 decimals
  }
}
