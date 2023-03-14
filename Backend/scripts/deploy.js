async function main() {

    const certify = await ethers.getContractFactory("Certify");
    const certifyContract = await certify.deploy();
    await certifyContract.deployed();

    const institution = await ethers.getContractFactory("Institution");
    const institutionContract = await institution.deploy();
    await institutionContract.deployed();

    console.log(`const CertifyAddress = "${certifyContract.address}"`);
    console.log(`const InstitutionAddress = "${institutionContract.address}"`);

  }
  
  main()
    .then(() => {
    })
    .catch((error) => {
      console.error('failed to deploy Contract', error);
    });