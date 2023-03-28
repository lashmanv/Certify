import React, {useState, useEffect} from "react";
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
import { Button1 } from '../ButtonElements';
import RRMultiSelect from 'rr-multi-select';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import bar from '../../images/bar.gif';
import final from "../../images/register.jpg";

import refresh from '../../images/refresh.png';

export default function Verif(props) {

	const [result, setResult] = useState(false);
	const [date, setDate] = useState(false);

	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(false);

	function dated(value) {

		const date = new Date(value * 1000);
		const formattedDate = date.toISOString().slice(0, 10);

		setDate(formattedDate);
	}

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

			{result ? (

			<>
			<br></br>
			
			<div style={{ backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '10px' }}>
			<h2 style={{ fontSize: '1.5em', color: '#333', marginBottom: '10px' }}>Certificate Details</h2>
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<p style={{ fontSize: '1.2em', margin: '5px 0' }}>Cerificate Id     : {result[0]}</p>
				<p style={{ fontSize: '1.2em', margin: '5px 0' }}>Candidate Name    : {result[1]}</p>
				<p style={{ fontSize: '1.2em', margin: '5px 0' }}>Candidate Number  : {result[2]}</p>
				<p style={{ fontSize: '1.2em', margin: '5px 0' }}>Candidate Address : {result[3]}</p>
				<p style={{ fontSize: '1.2em', margin: '5px 0' }}>Course Code       : {result[4]}</p>
				<p style={{ fontSize: '1.2em', margin: '5px 0' }}>Course Id         : {result[5]}</p>
				<p style={{ fontSize: '1.2em', margin: '5px 0' }}>Isrevoked         : {result[6]}</p>
				<p style={{ fontSize: '1.2em', margin: '5px 0' }}>Expiration Date   : {date}</p>
			</div>
			</div>


			</> ) :
			
			(<>

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
			)}
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

