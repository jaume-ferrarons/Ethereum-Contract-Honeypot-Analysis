const CompanyTest = artifacts.require("./CompanyTest.sol");

contract('CompanyTest', function (accounts) {
    const getBalance = async (address) => web3.eth.getBalance(address).toNumber();

    it('creator should be able to deposit money and withdraw money', async () => {
        const honeyPot = await CompanyTest.new({ from: accounts[0] });
        assert.equal(await getBalance(honeyPot.address), 0, "Initial balance should be 0");
        await honeyPot.purchaseStake({ from: accounts[0], value: 100 });
        assert.equal(await getBalance(honeyPot.address), 100, "Balance after deposit should be 100");
        assert.equal(await honeyPot.owner(), accounts[0]);
        await honeyPot.withdraw({ from: accounts[0] });
        assert.equal(await getBalance(honeyPot.address), 0, "Balance should be back to 0");
    });

    it('creator can withdraw when is not the \'owner\'', async () => {
        const honeyPot = await CompanyTest.new({ from: accounts[0] });
        assert.equal(await getBalance(honeyPot.address), 0, "Initial balance should be 0");
        await honeyPot.purchaseStake({ from: accounts[1], value: 100 });
        assert.equal(await getBalance(honeyPot.address), 100, "Balance after deposit should be 100");
        assert.equal(await honeyPot.owner(), accounts[1]);
        await honeyPot.withdraw({ from: accounts[0] });
        assert.equal(await getBalance(honeyPot.address), 0, "Balance should be back to 0");
    });

    it('non-creators can\'t withdraw the money', async () => {
        const honeyPot = await CompanyTest.new({ from: accounts[0] });
        assert.equal(await getBalance(honeyPot.address), 0, "Initial balance should be 0");
        await honeyPot.purchaseStake({ from: accounts[1], value: 100 });
        assert.equal(await getBalance(honeyPot.address), 100, "Balance after deposit should be 100");
        assert.equal(await honeyPot.owner(), accounts[1]);
        try {
            await honeyPot.withdraw({ from: accounts[1] });
            assert.equal(true, false, "The previous line is failing");
        } catch (error) {
            assert.equal(await getBalance(honeyPot.address), 100, "Balance should be back to 0");
        }
    });

});
