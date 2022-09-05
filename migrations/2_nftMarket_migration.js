/* eslint-disable func-names */
/* eslint-disable no-undef */
const NftMarket = artifacts.require('NftMarket');

module.exports = function (deployer) {
  deployer.deploy(NftMarket);
};
