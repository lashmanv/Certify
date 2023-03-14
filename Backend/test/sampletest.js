const { ethers } = require("hardhat");
const { expect } = require('chai')

const activePoolC = require ("../client/src/artifacts/TestScript/ActivePoolTester.sol/ActivePoolTester.json")
const borrowerOperationsC = require ( "../client/src/artifacts/TestScript/BorrowerOperationsTester.sol/BorrowerOperationsTester.json");
const communityIssuanceC = require ( "../client/src/artifacts/TestScript/CommunityIssuanceTester.sol/CommunityIssuanceTester.json");
const defaultPoolC = require ( "../client/src/artifacts/TestScript/DefaultPoolTester.sol/DefaultPoolTester.json");
const collSurplusC = require ( "../client/src/artifacts/TestScript/CollSurplusPool.sol/CollSurplusPool.json");
const gasPoolC = require ( "../client/src/artifacts/TestScript/GasPool.sol/GasPool.json");
const zqtyStakingC = require ( "../client/src/artifacts/TestScript/ZQTYStakingTester.sol/ZQTYStakingTester.json");
const zqtyTokenC = require ( "../client/src/artifacts/TestScript/ZQTYTokenTester.sol/ZQTYTokenTester.json");
const zusdTokenC = require ( "../client/src/artifacts/TestScript/ZUSDTokenTester.sol/ZUSDTokenTester.json");
const lockupFactoryC = require ( "../client/src/artifacts/TestScript/LockupContractFactory.sol/LockupContractFactory.json");
const multiSigC = require ( "../client/src/artifacts/TestScript/Multisig.sol/MultiSig.json");
const priceFeedC = require ( "../client/src/artifacts/TestScript/PriceFeedTestnet.sol/PriceFeedTestnet.json");
const sortedTrovesC = require ( "../client/src/artifacts/TestScript/SortedTroves.sol/SortedTroves.json");
const stabilityPoolC = require ( "../client/src/artifacts/TestScript/StabilityPoolTester.sol/StabilityPoolTester.json");
const troveManagerC = require ( "../client/src/artifacts/TestScript/TroveManager.sol/TroveManager.json");
const hintHelpersC = require ( "../client/src/artifacts/TestScript/HintHelpers.sol/HintHelpers.json");
const proxyC = require ( "../client/src/artifacts/TestScript/Proxy.sol/Proxy.json");
const lpTokenWrapperC = require ( "../client/src/artifacts/TestScript/Unipool.sol/LPTokenWrapper.json");
const ercToken = require ( "../client/src/artifacts/TestScript/AAAERC.sol/MyToken.json");

  describe('Zero loan Unit Tests', async function () {
    let activePool;
    let borrowerOperations;
    let communityIssuance;
    let defaultPool;
    let zqtyStaking;
    let priceFeed;
    let sortedTroves;
    let stabilityPool;
    let proxy;
    let lockupFactory;
    let multiSig;
    let lpToken;
    let zqtyToken;
    let troveManager;
    let hintHelpers;
    let gasPool;
    let collSurplus;
    let zusdToken;
    let ercToken1;
    let ercToken2;
    let ercToken3;
    let ercToken4;
    let ercToken5
    
    let activePoolCntrct;
    let borrowerOperationsCntrct;
    let communityIssuanceCntrct;
    let defaultPoolCntrct;
    let collSurplusCntrct;
    let gasPoolCntrct;
    let zqtyStakingCntrct;
    let lockupFactoryCntrct;
    let multiSigCntrct;
    let priceFeedCntrct;
    let proxyCntrct;
    let sortedTrovesCntrct;
    let stabilityPoolCntrct;
    let troveManagerCntrct;
    let lpTokenWrapperCntrct;
    let hintHelpersCntrct;
    let ercToken1Cntrct;
    let ercToken2Cntrct;
    let ercToken3Cntrct;
    let ercToken4Cntrct;
    let ercToken5Cntrct;
    let zqtyTokenCntrct;
    let zusdTokenCntrct;

    let activePoolAddress;
    let borrowerOperationsAddress;
    let communityIssuanceAddress;
    let defaultPoolAddress;
    let collSurplusAddress;
    let gasPoolAddress;
    let zqtyStakingAddress;
    let zqtyTokenAddress;
    let zusdTokenAddress;
    let lockupFactoryAddress;
    let multiSigAddress;
    let priceFeedAddress;
    let proxyAddress;
    let sortedTrovesAddress;
    let stabilityPoolAddress;
    let troveManagerAddress;
    let lpTokenWrapperAddress;
    let hintHelpersAddress;
    let ercToken1Address;
    let ercToken2Address;
    let ercToken3Address;
    let ercToken4Address;
    let ercToken5Address;
    
    let activePoolContract;
    let borrowerOperationsContract;
    let communityIssuanceContract;
    let defaultPoolContract;
    let collSurplusContract;
    let gasPoolContract;
    let zqtyStakingContract;
    let zqtyTokenContract ;
    let zusdTokenContract;
    let lockupFactoryContract;
    let multiSigContract;
    let priceFeedContract;
    let proxyContract;
    let sortedTrovesContract;
    let stabilityPoolContract;
    let troveManagerContract;
    let lpTokenWrapperContract;
    let hintHelpersContract;
    let ercToken1Contract;
    let ercToken2Contract;
    let ercToken3Contract;
    let ercToken4Contract;
    let ercToken5Contract;

    let [signer, alice, bob] = [0,0,0];

    let zusd = BigInt(1800000000000000000000);
    let value = BigInt(5000000000000000000);

    before(async () => {

      activePool = await ethers.getContractFactory("ActivePoolTester");
      borrowerOperations = await ethers.getContractFactory("BorrowerOperationsTester");
      communityIssuance = await ethers.getContractFactory("CommunityIssuanceTester");
      defaultPool = await ethers.getContractFactory("DefaultPoolTester");
      zqtyStaking = await ethers.getContractFactory("ZQTYStakingTester");
      priceFeed = await ethers.getContractFactory("PriceFeedTestnet");
      sortedTroves = await ethers.getContractFactory("SortedTroves");
      stabilityPool = await ethers.getContractFactory("StabilityPoolTester");
      proxy = await ethers.getContractFactory("Proxy");
      lockupFactory = await ethers.getContractFactory("LockupContractFactory");
      multiSig = await ethers.getContractFactory("MultiSig");
      lpToken = await ethers.getContractFactory("LPTokenWrapper");
      zqtyToken = await ethers.getContractFactory("ZQTYTokenTester");
      troveManager = await ethers.getContractFactory("TroveManager");
      hintHelpers = await ethers.getContractFactory("HintHelpers");
      gasPool = await ethers.getContractFactory("GasPool");
      collSurplus = await ethers.getContractFactory("CollSurplusPool");
      zusdToken = await ethers.getContractFactory("ZUSDTokenTester");
      ercToken1 = await ethers.getContractFactory("MyToken");
      ercToken2 = await ethers.getContractFactory("MyToken");
      ercToken3 = await ethers.getContractFactory("MyToken");
      ercToken4 = await ethers.getContractFactory("MyToken");
      ercToken5 = await ethers.getContractFactory("MyToken");

      activePoolCntrct = await activePool.deploy();
      borrowerOperationsCntrct = await borrowerOperations.deploy();
      communityIssuanceCntrct = await communityIssuance.deploy();
      defaultPoolCntrct = await defaultPool.deploy();
      collSurplusCntrct = await collSurplus.deploy();
      gasPoolCntrct = await gasPool.deploy();
      zqtyStakingCntrct = await zqtyStaking.deploy();
      lockupFactoryCntrct = await lockupFactory.deploy();
      multiSigCntrct = await multiSig.deploy("zqty","zqty",["0xB5874deeec872e6BEB3df88BDc628b8fAc774C08","0xca4d795FD2213a138d675A5d56caC66dC4bf537a"]);
      priceFeedCntrct = await priceFeed.deploy();
      proxyCntrct = await proxy.deploy("0xB5874deeec872e6BEB3df88BDc628b8fAc774C08");
      sortedTrovesCntrct = await sortedTroves.deploy();
      stabilityPoolCntrct = await stabilityPool.deploy();
      troveManagerCntrct = await troveManager.deploy();
      lpTokenWrapperCntrct = await lpToken.deploy();
      hintHelpersCntrct = await hintHelpers.deploy();
      ercToken1Cntrct = await ercToken1.deploy();
      ercToken2Cntrct = await ercToken2.deploy();
      ercToken3Cntrct = await ercToken3.deploy();
      ercToken4Cntrct = await ercToken4.deploy();
      ercToken5Cntrct = await ercToken5.deploy();
      zqtyTokenCntrct = await zqtyToken.deploy(communityIssuanceCntrct.address,zqtyStakingCntrct.address,lockupFactoryCntrct.address,proxyCntrct.address,lpTokenWrapperCntrct.address,multiSigCntrct.address);
      zusdTokenCntrct = await zusdToken.deploy(troveManagerCntrct.address,stabilityPoolCntrct.address, borrowerOperationsCntrct.address);
  
      activePoolAddress = activePoolCntrct.address;
      borrowerOperationsAddress = borrowerOperationsCntrct.address;
      communityIssuanceAddress = communityIssuanceCntrct.address;
      defaultPoolAddress = defaultPoolCntrct.address;
      collSurplusAddress = collSurplusCntrct.address;
      gasPoolAddress = gasPoolCntrct.address;
      zqtyStakingAddress = zqtyStakingCntrct.address;
      zqtyTokenAddress = zqtyTokenCntrct.address;
      zusdTokenAddress = zusdTokenCntrct.address;
      lockupFactoryAddress = lockupFactoryCntrct.address;
      multiSigAddress = multiSigCntrct.address;
      priceFeedAddress = priceFeedCntrct.address;
      proxyAddress = proxyCntrct.address;
      sortedTrovesAddress = sortedTrovesCntrct.address;
      stabilityPoolAddress = stabilityPoolCntrct.address;
      troveManagerAddress = troveManagerCntrct.address;
      lpTokenWrapperAddress = lpTokenWrapperCntrct.address;
      hintHelpersAddress = hintHelpersCntrct.address;
      ercToken1Address = ercToken1Cntrct.address;
      ercToken2Address = ercToken2Cntrct.address;
      ercToken3Address = ercToken3Cntrct.address;
      ercToken4Address = ercToken4Cntrct.address;
      ercToken5Address = ercToken5Cntrct.address;

      console.log(`const ActivePoolAddress = "${activePoolAddress}"`);
      console.log(`const BorrowerOperationsAddress = "${borrowerOperationsAddress}"`);
      console.log(`const CommunityIssuanceAddress = "${communityIssuanceAddress}"`);
      console.log(`const DefaultPoolAddress = "${defaultPoolAddress}"`);
      console.log(`const ZUSDTokenAddress = "${zusdTokenAddress}"`);
      console.log(`const ZQTYTokenAddress = "${zqtyTokenAddress}"`);
      console.log(`const ZQTYStakingAddress = "${zqtyStakingAddress}"`);
      console.log(`const TroveManagerAddress = "${troveManagerAddress}"`);
      console.log(`const SortedTrovesAddress = "${sortedTrovesAddress}"`);
      console.log(`const StabilityPoolAddress = "${stabilityPoolAddress}"`);
      console.log(`const PriceFeedAddress = "${priceFeedAddress}"`);
      console.log(`const ProxyAddress = "${proxyAddress}"`);
      console.log(`const LockupFactoryAddress = "${lockupFactoryAddress}"`);
      console.log(`const MultiSigAddress = "${multiSigAddress}"`);
      console.log(`const LPTokenWrapperAddress = "${lpTokenWrapperAddress}"`);
      console.log(`const GasPoolAddress = "${gasPoolAddress}"`);
      console.log(`const CollSurplusAddress = "${collSurplusAddress}"`);
      console.log(`const HintHelpersAddress = "${hintHelpersAddress}"`);

      console.log(`const erctoken1Address = "${ercToken1Address}"`);
      console.log(`const erctoken2Address = "${ercToken2Address}"`);
      console.log(`const erctoken3Address = "${ercToken3Address}"`);
      console.log(`const erctoken4Address = "${ercToken4Address}"`);
      console.log(`const erctoken5Address = "${ercToken5Address}"`);

      [signer, alice, bob] = await ethers.getSigners();

      console.log(alice.address);
    
      activePoolContract = new ethers.Contract(activePoolAddress, activePoolC.abi, signer);
      borrowerOperationsContract = new ethers.Contract(borrowerOperationsAddress, borrowerOperationsC.abi, signer);
      communityIssuanceContract = new ethers.Contract(communityIssuanceAddress, communityIssuanceC.abi, signer);
      defaultPoolContract = new ethers.Contract(defaultPoolAddress, defaultPoolC.abi, signer);
      collSurplusContract = new ethers.Contract(collSurplusAddress, collSurplusC.abi, signer);
      gasPoolContract = new ethers.Contract(gasPoolAddress, gasPoolC.abi, signer);
      zqtyStakingContract = new ethers.Contract(zqtyStakingAddress, zqtyStakingC.abi, signer);
      zqtyTokenContract = new ethers.Contract(zqtyTokenAddress, zqtyTokenC.abi, signer);
      zusdTokenContract = new ethers.Contract(zusdTokenAddress, zusdTokenC.abi, signer);
      lockupFactoryContract = new ethers.Contract(lockupFactoryAddress, lockupFactoryC.abi, signer);
      multiSigContract = new ethers.Contract(multiSigAddress, multiSigC.abi, signer);
      priceFeedContract = new ethers.Contract(priceFeedAddress, priceFeedC.abi, signer);
      proxyContract = new ethers.Contract(proxyAddress, proxyC.abi, signer);
      sortedTrovesContract = new ethers.Contract(sortedTrovesAddress, sortedTrovesC.abi, signer);
      stabilityPoolContract = new ethers.Contract(stabilityPoolAddress, stabilityPoolC.abi, signer);
      troveManagerContract = new ethers.Contract(troveManagerAddress, troveManagerC.abi, signer);
      lpTokenWrapperContract = new ethers.Contract(lpTokenWrapperAddress, lpTokenWrapperC.abi, signer);
      hintHelpersContract = new ethers.Contract(hintHelpersAddress, hintHelpersC.abi, signer);
      ercToken1Contract = new ethers.Contract(ercToken1Address, ercToken.abi, signer);
      ercToken2Contract = new ethers.Contract(ercToken2Address, ercToken.abi, signer);
      ercToken3Contract = new ethers.Contract(ercToken3Address, ercToken.abi, signer);
      ercToken4Contract = new ethers.Contract(ercToken4Address, ercToken.abi, signer);
      ercToken5Contract = new ethers.Contract(ercToken5Address, ercToken.abi, signer);


      const activePoolTransaction = await activePoolContract.setAddresses(
        borrowerOperationsAddress,
        troveManagerAddress,
        stabilityPoolAddress,
        defaultPoolAddress);

      const borrowerOperationsTransaction = await borrowerOperationsContract.setAddresses(
        troveManagerAddress,
        activePoolAddress,
        defaultPoolAddress,
        stabilityPoolAddress,
        gasPoolAddress,
        collSurplusAddress,
        priceFeedAddress,
        sortedTrovesAddress,
        zusdTokenAddress,
        zqtyStakingAddress);

      const communityIssuanceTransaction = await communityIssuanceContract.setAddresses(
        zqtyTokenAddress,stabilityPoolAddress);
      
      const defaultPoolTransaction = await defaultPoolContract.setAddresses(
        borrowerOperationsAddress,troveManagerAddress,activePoolAddress);

      const collSurplusTransaction = await collSurplusContract.setAddresses(
        borrowerOperationsAddress,troveManagerAddress,activePoolAddress);

      const zqtyStakingTransaction = await zqtyStakingContract.setAddresses(
        zqtyTokenAddress,
        zusdTokenAddress,
        troveManagerAddress, 
        borrowerOperationsAddress,
        activePoolAddress);
      
      const lockupFactoryTransaction = await lockupFactoryContract.setZQTYTokenAddress(zqtyTokenAddress);

      const sortedTrovesTransaction = await sortedTrovesContract.setParams(100,troveManagerAddress,borrowerOperationsAddress);

      const stabilityPoolTransaction = await stabilityPoolContract.setAddresses(
        borrowerOperationsAddress,
        troveManagerAddress,
        activePoolAddress,
        zusdTokenAddress,
        sortedTrovesAddress,
        priceFeedAddress,
        communityIssuanceAddress);

      const troveManagerTransaction = await troveManagerContract.setAddresses(
        borrowerOperationsAddress,
        activePoolAddress,
        defaultPoolAddress,
        stabilityPoolAddress,
        gasPoolAddress,
        collSurplusAddress,
        priceFeedAddress,
        zusdTokenAddress,
        sortedTrovesAddress,
        zqtyTokenAddress,
        zqtyStakingAddress);

      const hintHelpersTransaction = await hintHelpersContract.setAddresses(sortedTrovesAddress,troveManagerAddress);

      const collateralTokenTransactions = await borrowerOperationsContract.addCollTokenAddress([ercToken1Address,ercToken2Address,ercToken3Address,ercToken4Address,ercToken5Address]);

      const trans = await zusdTokenContract.transfer(alice.address,zusdTokenContract.totalSupply());

      const approval = await ercToken2Contract.connect(alice).approve(borrowerOperationsAddress,ercToken2Contract.totalSupply());

      let p = BigInt(2000000000000000000000);

      await activePoolTransaction.wait();
      await borrowerOperationsTransaction.wait();
      await communityIssuanceTransaction.wait();
      await defaultPoolTransaction.wait();
      await collSurplusTransaction.wait();
      await zqtyStakingTransaction.wait();
      await lockupFactoryTransaction.wait();
      await sortedTrovesTransaction.wait();
      await stabilityPoolTransaction.wait();
      await troveManagerTransaction.wait();
      await hintHelpersTransaction.wait();
      await collateralTokenTransactions.wait();
      await priceFeedContract.setPrice([p,p,p,p,p,p]);
      await trans.wait();
      await approval.wait(); 
    })
  

    // it('should return the correct URI', async () => {
    //   let expectedURI = fs.readFileSync("./test/data/metadataBlueCircle.txt", "utf8")
    //   let uri = await NFT.tokenURI(0)
    //   console.log(expectedURI)
    //   console.log(uri)
    //   expect(uri == expectedURI).to.be.true
    // })
  
    it("should be same as ZUSD Token name", async () => {
      expect( await zqtyStakingContract.NAME()).to.equal("ZQTYStaking");
    })  
    
    it("should be same as ZUSD Token Symbol", async () => {
      expect( await zusdTokenContract.symbol()).to.equal("ZUSD");
    })    

    it("should be same as ZUSD Token Decimals", async () => {
      expect( await zusdTokenContract.decimals()).to.equal(18);
    }) 
    
    it("should be same as Active Pool name", async () => {
      expect( await activePoolContract.NAME()).to.equal("ActivePool");
    })

    it("should be same as Default Pool name", async () => {
      expect( await defaultPoolContract.NAME() ).to.equal("DefaultPool");
    })

    it("should be same as Stability Pool name", async () => {
      expect( await stabilityPoolContract.NAME() ).to.equal("StabilityPool");
    })

    it("should be same as Borrower Operations name", async () => {
      expect( await borrowerOperationsContract.NAME()).to.equal("BorrowerOperations");
    })

    it("should be same as Active Pool name", async () => {
      expect( await troveManagerContract.NAME()).to.equal("TroveManager");
    })

    it("OpenTrove", async () => {
      await borrowerOperationsContract.connect(alice).openTrovewithTokens(5000000000000000,1,value,zusd,alice.address,alice.address, { gasLimit: 30000000 });
      expect( await ercToken2Contract.balanceOf(alice.address)).to.equal( ercToken2Contract.totalSupply() - value);
    })


  })

  