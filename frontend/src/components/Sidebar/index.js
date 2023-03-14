import React, { useState } from 'react';
import {
  SidebarContainer,
  Icon,
  CloseIcon,
  SidebarWrapper, 
  SidebarMenu, 
  SidebarLink, 
  SideBtnWrap, 
  SidebarRoute, 
} from './SidebarElement'


import { ethers } from "ethers";

import Certify from "../../artifacts/contracts/Certify.sol/Certify.json";
import Institution from "../../artifacts/contracts/Institution.sol/Institution.json";

export default function Sidebar({isOpen, toggle,connected,callback,contract}) {

  const CertifyAddress = "0xd022D6eaFad443E6A6f8E31Fa2dfd0F846799E61"
	const InstitutionAddress = "0xa2d66997aa33FD2D0aA5f65D95160ddf971851a8"

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
			else console.log("Invalid network : Change Metamask network to Ethereum Testnet");

			// Get an instance of the contract sop we can call our contract functions
			let contract1 = new ethers.Contract(CertifyAddress, Certify, signer);
			let contract2 = new ethers.Contract(InstitutionAddress, Institution, signer);

      if(bool) callback({ provider, signerAddress, contract1, contract2});
      else{provider=null;signerAddress=0;contract1= null;contract2= null; callback({ provider, signerAddress, contract1, contract2});}
      
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

  if(!connected) {
  return (
    <SidebarContainer isOpen={isOpen} onClick={toggle}>
      <Icon>
        <CloseIcon />
      </Icon>
      <SidebarWrapper>
        <SidebarMenu>
        <SidebarLink to="home" onClick={toggle}>
          Home
        </SidebarLink>
        <SidebarLink to="generate" onClick={toggle}>
          Generate
        </SidebarLink>
        <SidebarLink to="verify" onClick={toggle}>
          Verify
        </SidebarLink>
        <SidebarLink to="register" onClick={toggle}>
          Register
        </SidebarLink>
        </SidebarMenu>
        <SideBtnWrap>
          <SidebarRoute onClick={connect}>Connect Wallet</SidebarRoute>
        </SideBtnWrap>
      </SidebarWrapper>
    </SidebarContainer>
  );
};
return (
  <SidebarContainer isOpen={isOpen} onClick={toggle}>
    <Icon>
      <CloseIcon />
    </Icon>
    <SidebarWrapper>
      <SidebarMenu>
        <SidebarLink to="home" onClick={toggle}>
          Home
        </SidebarLink>
        <SidebarLink to="generate" onClick={toggle}>
          Generate
        </SidebarLink>
        <SidebarLink to="verify" onClick={toggle}>
          Verify
        </SidebarLink>
        <SidebarLink to="register" onClick={toggle}>
          Register
        </SidebarLink>
      </SidebarMenu>
      <SideBtnWrap>
        <SidebarRoute>{addrs}...</SidebarRoute>
      </SideBtnWrap>
    </SidebarWrapper>
  </SidebarContainer>
);
};


