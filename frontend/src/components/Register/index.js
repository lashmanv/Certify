import React, {useState, useEffect} from "react";
import { ethers } from "ethers";
import {
  RegisterContainer,
  RegisterH1,
  RegisterWrapper,
  RegisterCard,
  RegisterIcon,
  ReloadIcon,
  RefreshIcon,
  RegisterH2,
  RegisterC,
  Register,
  Register1,
  RegisterMany,
  RegisterRow,
  Column1,
  TextWrapper,
  TopLine,
  Heading,
  Subtitle,
  BtnWrap,
  Column2,
  ImgWrap,
  Img,
} from './RegisterElements'
import { Button,Button1 } from '../ButtonElements';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import bar from '../../images/bar.gif';
import final from "../../images/icon1.png";

import refresh from '../../images/refresh.png';

import Certify from "../../artifacts/contracts/Certify.sol/Certify.json";
import Institution from "../../artifacts/contracts/Institution.sol/Institution.json";

export default function Verif(props) {
	const [event, setEvent] = useState("Register");
	const [mint, setMint] = useState(true);
	
	const[loading, setLoading] = useState(true);
	
	const [totalSupply, setTotalSupply] = useState(null);
	const [tokenids, settokenids] = useState([]);
	const [tokenURIs, setTokenURIs] = useState([]);

	const [success, setSuccess] = useState(true);
	const [error, setError] = useState(true);

	const [contract, setContract] = useState();

		
	const CertifyAddress = "0xd022D6eaFad443E6A6f8E31Fa2dfd0F846799E61"
	const InstitutionAddress = "0xa2d66997aa33FD2D0aA5f65D95160ddf971851a8"

	let contract1;
	let contract2;

	const fetchMyAPI = async () => {
		try {
			// Get network provider and web3 instance.	
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			await window.ethereum.request({method: "eth_requestAccounts"});
			// Use web3 to get the user's accounts.
			const signer = provider.getSigner();
			// Get an instance of the contract sop we can call our contract functions
			contract1 = new ethers.Contract(CertifyAddress, Certify, signer);
			contract2 = new ethers.Contract(InstitutionAddress, Institution, signer);
			setContract(contract2);

		} catch (error) {
			// Catch any errors for any of the above operations.
			console.error("Could not connect to Nft contract.", error);
		}
	}

	const DoRegister = async (e) => {
		console.log(event);
		if(!props || !contract || props.network!== 5) return;
		console.log("loading...");
		console.log(e);
		let id ;
		if(e.length > 1) {id = [e];}
		id = e;
		try{
			const transaction = await props.contract.RegisterNft(id);
			await transaction.wait;
			console.log(transaction);
			contract.on("Transfer", (from, to, tokenId) => {
				setMint("Token Id : "+ parseInt(tokenId)+" succesfully minted to "+to);
				console.log(mint);
			});
      	} 
		catch (error) {
			if((error?.data?.message.includes("user rejected transaction") || error?.message.includes("user rejected transaction")));
				setError(error);
				notify("User rejected transaction");
				console.log(error);
      	}
	};

	

	const closeLoaderIn5Seconds = () => {
	  setTimeout(() => setLoading(false), 10000);
  	};

	useEffect(() => {
		setTimeout(() => setError(false), 5000);
		setTimeout(() => setSuccess(false), 5000);
	  }, [error], [success]);

	useEffect(() => {
		const body = document.querySelector('#root');
	
		body.scrollIntoView({
			behavior: 'smooth'
		}, 500)
	
	}, []);


	// Handle contract unavailable. 
	// This is an extra precaution since the user shouldn't be able to get to this page without connecting.
	//if(!props.contract) return (<div className="page error">Contract Not Available</div>);

	// Get all token IDs associated with the wallet address when the component mounts.
	if(!totalSupply) fetchMyAPI();


	const notify = (e) => toast(e, {
		position: "top-right",
		className: 'toast-notify',
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: "dark",
		});     
	
	// Display the personal token gallery
	if(!props.address) {
		return (
		<>
			<RegisterContainer id="Register" >
				<RegisterWrapper>
				<RegisterRow >
					<Column1>
					<TextWrapper>
						<TopLine>Register certificates</TopLine>
						<Heading lightText={false}>Welcome to Certify!</Heading>
						<Subtitle darkText={true}>
						With our easy-to-use tool, you can Register any certificates.
						Simply choose from our templates, customize with your details, and upload your certificate in blockchain.</Subtitle>
						<BtnWrap>
						<Button1 >
						Click on Connect Wallet
						</Button1>
						</BtnWrap>
					</TextWrapper>
					</Column1>
					<Column2>
					<ImgWrap>
						<Img src={final} alt="nfts" />
					</ImgWrap>
					</Column2>
				</RegisterRow>
				</RegisterWrapper>
			</RegisterContainer>
		</>
		);
	}
	if(!tokenURIs){return(<RegisterH1>Loading...</RegisterH1>)}
	return (
		<>
		<RegisterContainer id="Register">
			<RegisterH1>Register Certificates<RefreshIcon src={refresh} alt={"refresh"} onClick={() => {setLoading(true); closeLoaderIn5Seconds(); }}/> </RegisterH1>
			
			{loading ? <ReloadIcon src={bar} alt={'progrss'}/> : <RegisterH2></RegisterH2>}
			<ToastContainer
				position="top-right"
				autoClose={10000}
				hideProgressBar={false}
				newestOnTop={true}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="black"
			/>
		</RegisterContainer>	
		</>
	);
}

