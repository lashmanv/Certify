import React, {useState, useEffect} from "react";
import { Link } from 'react-router-dom'; 

import { ethers } from "ethers";
import {
  RegisterContainer,
  RegisterH1,
  RegisterWrapper,
  ReloadIcon,
  RefreshIcon,
  RegisterH2,
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
import { Button1, Button3 } from '../ButtonElements';
import RRMultiSelect from 'rr-multi-select';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import bar from '../../images/bar.gif';
import final from "../../images/register.jpg";

import refresh from '../../images/refresh.png';

import Certify from "../../artifacts/contracts/Certify.sol/Certify.json";
import Institution from "../../artifacts/contracts/Institution.sol/Institution.json";

export default function Verif(props) {
	
	const CertifyAddress = "0x57C5C9156fa8770995316b1F9B89aE9fb9fdf215"
	const InstitutionAddress = "0xc13FFC9bC07F427c370e4442cE4e8E87BcC38411"

	const [register, setRegister] = useState(false);
	const [loading, setLoading] = useState(false);

	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(false);

	const [instituteAddress, setInstituteAddress] = useState('');
	const [instituteCode, setInstituteCode] = useState('');
	const [instituteName, setInstituteName] = useState('');
	const [instituteAcronym, setInstituteAcronym] = useState('');
	const [instituteCourses, setInstituteCourses] = useState('');

	const DoRegister = async (event) =>{

		console.log(props.network);

		// if(!props.InstitutionAddress || props.network!==80001) return;

		try{
			event.preventDefault();
			
			let contract = new ethers.Contract(CertifyAddress, Certify, props.signer);

			const transaction = await contract.createInstitution(
				instituteAddress,
				instituteCode,
				instituteName,
				instituteAcronym,
				instituteCourses
			);
			await transaction.wait();

			setRegister(transaction.hash);

			setLoading(false);
			
			console.log(transaction.hash);
			}
		catch (error) {
			if((error?.data?.message.includes("user rejected transaction") || error?.message.includes("user rejected transaction"))) {
				setError("user rejected transaction");
				notify("User rejected transaction");
			}
			setLoading(false);
			notify(error.reason.slice(0, 41));
			console.log(error);
		}
	};

	const options = [
		"CSE",
		"ECE",
		"EEE",
		"ME",
		"IT",
		"EIE",
		"CE",
		"RA",
		"AE"
	  ];

	function etherscan() {
		// event.preventDefault();
		console.log(register);
		window.open("https://goerli.etherscan.io/tx/"+register, "_blank");
	};
	  
	const another = () => {
	};
	  
	const [value,setValue] = useState([]);
	
	function clearForm() {
		// Get the form element
		var form = document.getElementById("myForm");
		// Reset the form
		form.reset();
	  }

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

	function toggleHome() {
		return (
		  <>
		  <Link to="/verify" />
		  </>
		);
	  };


	// Handle contract unavailable. 
	// This is an extra precaution since the user shouldn't be able to get to this page without connecting.
	//if(!props.contract) return (<div className="page error">Contract Not Available</div>);

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
						<TopLine>Register your Institution</TopLine>
						<Heading lightText={false}>Welcome to Certify!</Heading>
						<Subtitle darkText={true}>
						With our easy-to-use tool, you can Register any certificates.
						Simply choose from our templates, customize with your details, and upload your certificate in blockchain.
						</Subtitle>
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

	if(props.address == "0xB8A88D567304DbcDB0E8530445C9eFf4c0719252") {
		if(register) {
		
			return (
				<>
				<RegisterContainer id="generate">
					{notify("Transaction Hash: "+register)}
				
					<RegisterWrapper>
					<RegisterRow >
						<Column1 >
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
						<TextWrapper>
							
							<Subtitle darkText={true}>Institute Registerred successfully</Subtitle>
							<Subtitle darkText={true}>Transaction Hash: </Subtitle>
							<Subtitle darkText={true}>Verify on etherscan:</Subtitle>
							<a href="#" onClick={() => {etherscan();}}>
								<Subtitle darkText={true}>{register}</Subtitle>
							</a>
							
							<BtnWrap>
							<Button1 to="/verify" onClick={toggleHome}> Verify Institution </Button1>
							</BtnWrap>
	
							<br></br>
							
							<Button3 onClick={another}> Register another Institution</Button3>
	
						</TextWrapper>
						</Column1>
						<Column2>
						<ImgWrap>
							<Img src={final} alt="nfts"/>
						</ImgWrap>
						</Column2>
					</RegisterRow>
					</RegisterWrapper>
				</RegisterContainer>
				</>
			);
		}
		else {
			return (
				<>
				<RegisterContainer id="Register">
				<RegisterWrapper>
					<RegisterRow >
					<Column1>
					<TextWrapper>
						<TopLine>Welcome back Admin !!!</TopLine>
						<RegisterH1>Register Institution<RefreshIcon src={refresh} alt={"refresh"} onClick={() => {clearForm()}}/> </RegisterH1>
		
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
		
					</TextWrapper>
					
					<>
		
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
					<>
						<form className="form">
							<div className="form-column">
								<label htmlFor="field1">Insitute Address</label>
								<input type="text" id="field1" value={instituteAddress} onChange={e => setInstituteAddress(e.target.value)} />
								<label htmlFor="field2">Institute Code</label>
								<input type="text" id="field2" value={instituteCode} onChange={e => setInstituteCode(e.target.value)} />
								<label htmlFor="field3">Institute Name</label>
								<input type="text" id="field3" value={instituteName} onChange={e => setInstituteName(e.target.value)} />
								<label htmlFor="field3">Institute Acronym</label>
								<input type="text" id="field3" value={instituteAcronym} onChange={e => setInstituteAcronym(e.target.value)} />
								<RRMultiSelect
									name="instituteCourses" 
									options={options}
									value={value}
									onChange={setValue}
								/>	
							</div>
						</form>
						<div className="button" onClick={(event) => { DoRegister(event); } }> Register </div>
						
					<br></br>
		
					</></>
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
	}
	else {
		return (
			<>
			<RegisterContainer id="Register">
			<RegisterWrapper>
				<RegisterRow >
				<Column1>
				<TextWrapper>
					<TopLine>Move to decentralization</TopLine>
					<Heading lightText={false}>Welcome to Certify!</Heading>
					<RegisterH1>Register your Institution<RefreshIcon src={refresh} alt={"refresh"} onClick={() => {clearForm()}}/> </RegisterH1>

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

				</TextWrapper>

				<>

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
				<>
				<form id="myForm" method="POST" action="https://script.google.com/macros/s/AKfycbxO3tgtE7f5a-CGsHqk4-cfWq_q9f2ZuUK8Q2D9n5MRoDKCBB6WlzE3MI-IrWCMU1-m/exec">
					<div className="form-column">
						
						<input name="ownerAddress" type="text" placeholder="0xAbcd" required />
						<input name="instituteCode" type="number" placeholder="1001" required />
						<input name="instituteName" type="text" placeholder="A B C Insitute" required />
						<input name="instituteAcronym" type="text" placeholder="ABC" required />
						<RRMultiSelect
							name="instituteCourses" 
							options={options}
							value={value}
							onChange={setValue}
						/>			

						<button className="button" type="submit">Submit</button>
					</div>
				</form>
					
				<br></br>

				</></>
				
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
}

