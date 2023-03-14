import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import HeroSection from '../components/HeroSection'; 
import InfoSection from '../components/InfoSection';
import {homeObjeThree} from '../components/InfoSection/Data';

import Generate from '../components/Generate';
import Verify from '../components/Verify';
import Register from '../components/Register';
import Footer from '../components/Footer';

function Home() {

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    const [web3props, setWeb3Props] = useState({ provider: null, signerAddress: null, contract1: null, contract2: null, network: null });

    // If the wallet is connected, all three values will be set. Use to display the main nav below.
    const contractAvailable = !(!web3props.provider && !web3props.signerAddress && !web3props.contract1  && !web3props.contract2 && !web3props.network);
    // Grab the connected wallet address, if available, to pass into the Login component
    const walletAddress = web3props.signerAddress ? web3props.signerAddress[0] : "";

    const ConnectedNetwork = web3props.network;

    let OnLogin = function(param){
      let { provider, signerAddress, contract1, contract2, network} = param;
      if(provider && signerAddress && signerAddress.length && contract1 && contract2 && network){
        setWeb3Props({ provider, signerAddress, contract1, contract2, network });
      }
    }

    useEffect(() => {
      const body = document.querySelector('#root');
  
      body.scrollIntoView({
          behavior: 'smooth'
      }, 500)
  
    }, []);
  
  return (
    <>
      <Sidebar isOpen={isOpen} toggle={toggle} callback = {OnLogin} contract1={web3props.contract1} contract2={web3props.contract2} connected={contractAvailable} address={walletAddress} network={ConnectedNetwork}/>
      <Navbar toggle={toggle} callback = {OnLogin} contract1={web3props.contract1} contract2={web3props.contract2} connected={contractAvailable} address={walletAddress} network={ConnectedNetwork}/>
      
        <Routes>
          <Route path='*' element={<HeroSection />} />

          <Route path='generate' element={<Generate toggle={toggle} contract1={web3props.contract1} contract2={web3props.contract2} connected={contractAvailable} address={walletAddress} network={ConnectedNetwork}/>} />
          <Route path='verify' element={<Verify toggle={toggle} contract1={web3props.contract1} contract2={web3props.contract2} connected={contractAvailable} address={walletAddress} network={ConnectedNetwork}/>} />
          <Route path='register' element={<Register toggle={toggle} contract1={web3props.contract1} contract2={web3props.contract2} connected={contractAvailable} address={walletAddress} network={ConnectedNetwork}/>} />
          <Route path='info' element={<InfoSection toggle={toggle} {...homeObjeThree} />} />
          
        </Routes>

      <InfoSection toggle={toggle} {...homeObjeThree} />

      <Footer />
    
      {/* <HeroSection />
      <Mint toggle={toggle} contract={web3props.contract} connected={contractAvailable} address={walletAddress} network={ConnectedNetwork}/>
      <Stake toggle={toggle} contract={web3props.contract} connected={contractAvailable} address={walletAddress} network={ConnectedNetwork}/>
      <Staked toggle={toggle} contract={web3props.contract} connected={contractAvailable} address={walletAddress} network={ConnectedNetwork}/>
      <InfoSection toggle={toggle} {...homeObjeThree} /> */}
      
    </>
  );
}

export default Home;
