/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
const NftMarket = artifacts.require('./contracts/NftMarket');
const { ethers } = require('ethers');

contract('NftMarket', (accounts) => {
  let _contract = null;
  const _nftPrice = ethers.utils.parseEther('0.3').toString();
  const _listingPrice = ethers.utils.parseEther('0.025').toString();

  before(async () => {
    _contract = await NftMarket.deployed();
  });

  describe('Mint token', () => {
    const tokenURI = 'https://test.com';
    before(async () => {
      await _contract.mintToken(tokenURI, _nftPrice, {
        from: accounts[0],
        value: _listingPrice,
      });
    });
    it('owner of the first token should be address[0]', async () => {
      const owner = await _contract.ownerOf(1);
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
        await _contract.mintToken(tokenURI, _nftPrice, {
          from: accounts[0],
        });
      } catch (error) {
        assert(error, 'NFT was minted with previously used tokenURI');
      }
    });

    it('should have one listed item', async () => {
      const listedItemCount = await _contract.listedItemsCount();
      assert.equal(
        listedItemCount.toNumber(),
        1,
        'Listed items count is not 1'
      );
    });

    it('should have create NFT item', async () => {
      const nftItem = await _contract.getNftItem(1);

      assert.equal(nftItem.tokenId, 1, 'Token id is not 1');
      assert.equal(nftItem.price, _nftPrice, 'Nft price is not correct');
      assert.equal(nftItem.creator, accounts[0], 'Creator is not account[0]');
      assert.equal(nftItem.isListed, true, 'Token is not listed');
    });
  });

  describe('Buy NFT', () => {
    before(async () => {
      await _contract.buyNft(1, {
        from: accounts[1],
        value: _nftPrice,
      });
    });

    it('should unlist the item', async () => {
      const listedItem = await _contract.getNftItem(1);
      assert.equal(listedItem.isListed, false, 'Item is still listed');
    });

    it('should decrease listed items count', async () => {
      const listedItemsCount = await _contract.listedItemsCount();
      assert.equal(
        listedItemsCount.toNumber(),
        0,
        'Count has not been decrement'
      );
    });

    it('should change the owner', async () => {
      const currentOwner = await _contract.ownerOf(1);
      assert.equal(currentOwner, accounts[1], 'Item is still listed');
    });

    it('should have one listed NFT', async () => {
      const allNfts = await _contract.getAllNftsOnSale();
      assert.equal(allNfts[0].tokenId, 2, 'Nft has a wrong id');
    });

    describe('Token transfer to new owner', () => {
      before(async () => {
        await _contract.transferFrom(accounts[0], accounts[1], 2);
      });

      it('accounts[0] should own 0 tokens', async () => {
        const ownedNfts = await _contract.getOwnedNfts({ from: accounts[0] });
        assert.equal(ownedNfts.length, 0, 'Invalid length of tokens');
      });

      it('accounts[1] should own 2 tokens', async () => {
        const ownedNfts = await _contract.getOwnedNfts({ from: accounts[1] });
        assert.equal(ownedNfts.length, 2, 'Invalid length of tokens');
      });
    });
  });

  describe('List an Nft', () => {
    before(async () => {
      await _contract.placeNftOnSale(1, _nftPrice, {
        from: accounts[1],
        value: _listingPrice,
      });
    });

    it('should have two listed items', async () => {
      const listedNfts = await _contract.getAllNftsOnSale();

      assert.equal(listedNfts.length, 2, 'Invalid length of Nfts');
    });

    it('should set new listing price', async () => {
      await _contract.setListingPrice(_listingPrice, { from: accounts[0] });
      const listingPrice = await _contract.listingPrice();

      assert.equal(listingPrice.toString(), _listingPrice, 'Invalid Price');
    });
  });
});
