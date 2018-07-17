const CompanyTest = artifacts.require("./CompanyTest.sol");

module.exports = function(deployer) {
    deployer.deploy(CompanyTest);
};
