/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
const NftMarket = artifacts.require('./contracts/NftMarket');

contract('NftMarket', (accounts) => {
  let _contract = null;

  before(async () => {
    _contract = await NftMarket.deployed();
    console.log(accounts);
  });

  describe('Mint token', () => {
    const tokenURI = 'https://test.com';
    before(async () => {
      await _contract.mintToken(tokenURI, {
        from: accounts[0],
      });
    });
    it('owner of the first token should be address[0]', async () => {
      const owner = await _contract.ownerOf(1);
      console.log(owner, accounts[0]);
      assert.equal(
        owner,
        accounts[0],
        'Owner of token is not matching address[0]'
      );
    });

    it('first token should point to the correct tokenURI', async () => {
      const actualTokenURI = await _contract.tokenURI(1);

      assert.equal(actualTokenURI, tokenURI, 'tokenURI is not correctly set');
    });

    it('should not be possible to create a NFT with used tokenURI', async () => {
      try {
        await _contract.mintToken(tokenURI, {
          from: accounts[0],
        });
      } catch (error) {
        assert(error, 'NFT was minted with previously used tokenURI');
      }
    });
  });
});
