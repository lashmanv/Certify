import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

import { Routes, Route } from 'react-router-dom';

import HeroSection from '.././HeroSection'; 

import {
  Nav,
  NavTo,
  NavbarContainer,
  MobileIcon,
  NavMenu,
  NavItem,
  NavLinks, 
  NavBtn, 
  NavIcon,
  NavBtnLink, 
} from './NavbarElements';
import { FaBars } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib'; 

import { ethers } from "ethers";

import icon from '../../images/icon.png';

import Certify from "../../artifacts/contracts/Certify.sol/Certify.json";
import Institution from "../../artifacts/contracts/Institution.sol/Institution.json";

export default function Navbar({toggle,callback,connected,contract}) {

  const CertifyAddress = "0xbc2299cB31ebd6390827c87B0b0b8d724C9E1835"
  const InstitutionAddress = "0xa66a02AF069d6FeA7C4Fd321801f727F90AedE36"

	const DoConnect = async (bool) => {
		console.log('Connecting....');
		try {
			// Get network provider and web3 instance.	
			let provider = new ethers.providers.Web3Provider(window.ethereum);

			await window.ethereum.request({method: "eth_requestAccounts"});

			// Use web3 to get the user's accounts.
			const signer = provider.getSigner();
		  let signerAddress = await signer.getAddress();
			signerAddress = [`${signerAddress}`];

      let network = await provider.getNetwork();
      network = network.chainId;
      console.log(signerAddress[0],network);

      if(network === 5) setAddrs(signerAddress[0].slice(0,10));
			else {setAddrs(signerAddress[0].slice(0,10)); console.log("Invalid network : Change Metamask network to Ethereum Testnet");}

			// Get an instance of the contract sop we can call our contract functions
			let contract1 = new ethers.Contract(CertifyAddress, Certify, signer);
			let contract2 = new ethers.Contract(InstitutionAddress, Institution, signer);

      if(bool) callback({provider, signerAddress, contract1, contract2, network});

      else{provider=null;signerAddress=0;contract1= null;contract1= null;network=null; callback({provider, signerAddress, contract1, contract2, network});}
      
		} catch (error) {
			// Catch any errors for any of the above operations.
			console.error("Could not connect to wallet", error);
		}
	};


  const [addrs, setAddrs] = useState(null);

  const connect = () => {
    DoConnect(true);
  }
  const disconnect = () => {
    console.log(contract);
  }

  function toggleHome() {
    return (
      <>
      <Route path='*' element={<HeroSection />} />
      </>
    );
  };

  const refresh = () => window.location.reload();

  const top = (() => {
    const body = document.querySelector('#root');

    body.scrollIntoView({
        behavior: 'smooth'
    }, 500)

  });
  

  // If not connected, display the connect button.
	if(!connected) {
    return (
      <>
        <IconContext.Provider value={{ color: '#fff' }}>
          <Nav>
            <NavbarContainer>
              <NavTo to="/home" >
            <NavIcon src={icon} alt="icon" to="/home" onClick={toggleHome} />
              <MobileIcon onClick={toggle}>
                <FaBars />
              </MobileIcon>
              </NavTo>
              <NavMenu>
                {[
                  { to: 'home', title: 'Home', },
                  { to: 'generate', title: 'Generate', }, 
                  { to: 'verify', title: 'Verify', },
                  { to: 'register', title: 'Register', },      
                ].map(({ to, title }) => (
                  <NavItem key={to}>
                    <NavLinks to={to}>
                      {title}
                    </NavLinks>
                  </NavItem>
                ))}
              </NavMenu>
              <NavBtn>
                <NavBtnLink onClick={() => {connect(); top();}}>Connect Wallet</NavBtnLink>
              </NavBtn>
            </NavbarContainer>
          </Nav>
        </IconContext.Provider>
      </>
    )
  }

    return (
      <>
        <IconContext.Provider value={{ color: '#fff' }}>
          <Nav>
            <NavbarContainer>
              <NavTo to="/home">
              <NavIcon src={icon} alt="icon" to="/home" onClick={toggleHome} />
              <MobileIcon onClick={toggle}>
                <FaBars />
              </MobileIcon>
              </NavTo>
              <NavMenu>
                {[
                  { to: 'home', title: 'Home', },
                  { to: 'generate', title: 'Generate', }, 
                  { to: 'verify', title: 'Verify', },
                  { to: 'register', title: 'Register', },
                ].map(({ to, title }) => (
                  <NavItem key={to}>
                    <NavLinks to={to} >
                      {title}
                    </NavLinks>
                  </NavItem>
                ))}
              </NavMenu>
              <NavBtn>
                <NavBtnLink>{addrs}...</NavBtnLink>
              </NavBtn>
            </NavbarContainer>
          </Nav>
        </IconContext.Provider>
      </>
    )
  
  }

