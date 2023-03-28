import React, {useState, useEffect} from "react";
import { ethers } from "ethers";
import {
  VerifyContainer,
  VerifyH1,
  VerifyWrapper,
  ReloadIcon,
  RefreshIcon,
  VerifyH2,
  VerifyRow,
  Column1,
  Column3,
  TextWrapper,
  TopLine,
  Heading,
  Subtitle,
  BtnWrap,
  Column4,
  Column2,
  ImgWrap,
  Img,
  ImgWrap1,
  Img1
} from './VerifyElements'
import { Button1 } from '../ButtonElements';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import bar from '../../images/bar.gif';
import final from "../../images/verify.jpg";

import refresh from '../../images/refresh.png';

import Institution from "../../artifacts/contracts/Institution.sol/Institution.json";

export default function Verif(props) {

	const InstitutionAddress = "0xc13FFC9bC07F427c370e4442cE4e8E87BcC38411"

	const [Id, setId] = useState('');

	const [result, setResult] = useState([
		// {CerificateId: '', CandidateName: '', CandidateNumber: '', CandidateAddress: '', CourseCode: '', CourseId: '', Isrevoked: '', ExpirationDate: ''}
	]);	  
	
	const[loading, setLoading] = useState(false);

	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(false);

	const DoVerify = async (e,val) => {
		
		console.log(val);
		try{
			setLoading(true);
			console.log(val.length)
			if(val.length == 42) {
				let ids = await DoVerifyUser(val);
				let res = [];

				let i;
				for(i = 0; i < ids.length; i++) {
					res.push(await DoVerifyCerti(ids[i]));
				}

				console.log(res)

				setResult(res);

				setLoading(false);
			}
			else {
				let res = [];

				res.push(await DoVerifyCerti(val));
				
				console.log(res)

				setResult(res);

				setLoading(false);
      		} 

		}
		catch (error) {
			notify(error.reason.slice(0, 41));
			console.log(error);

			setLoading(false);
      	}
	}

	const DoVerifyCerti = async (val) => {

		// if(!props.InstitutionAddress || props.network!==5) return;

		try{
			setLoading(true);
			let contract = new ethers.Contract(InstitutionAddress, Institution, props.signer);

			let transaction = await contract.getCertificateDetails(val);

			transaction = transaction.slice();

			transaction[6] == false ? transaction[6] = 'No' : transaction[6] = 'Yes';

			const newObject = { 
				CerificateId: transaction[0], 
				CandidateName: transaction[1], 
				CandidateNumber: transaction[2], 
				CandidateAddress: transaction[3], 
				CourseCode: transaction[4], 
				CourseId: transaction[5], 
				Isrevoked: transaction[6], 
				ExpirationDate: dated(parseInt(transaction[7]._hex))
			};

			// console.log(newObject);

			return newObject;
      	} 
		catch (error) {
			if(error && error?.message.includes("user rejected transaction")) {
				setError(error);
				notify("User rejected transaction");
				setLoading(false);
			}
			else{
				notify(error.reason);
				console.log(error);

				setLoading(false);
			}
      	}
	};

	const DoVerifyUser = async (val) => {

		// if(!props.InstitutionAddress || props.network!==5) return;

		try{
			setLoading(true);
			let contract = new ethers.Contract(InstitutionAddress, Institution, props.signer);

			let transaction = await contract.getUserCertificates(val);

			// console.log(transaction);

			return transaction;
      	} 
		catch (error) {
			if(error && error?.message.includes("user rejected transaction")) {
				setError(error);
				notify("User rejected transaction");
				setLoading(false);
			}
			else{
				notify(error.reason);
				console.log(error);

				setLoading(false);
			}
      	}
	};

	function dated(value) {

		const date = new Date(value * 1000);
		const formattedDate = date.toISOString().slice(0, 10);

		return formattedDate;
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
			<VerifyContainer id="verify" >
				<VerifyWrapper>
				<VerifyRow >
					<Column1>
					<TextWrapper>
						<TopLine>Verify certificates</TopLine>
						<Heading lightText={false}>Welcome to Certify!</Heading>
						<Subtitle darkText={true}>
						With our easy-to-use tool, you can verify any certificates.
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
				</VerifyRow>
				</VerifyWrapper>
			</VerifyContainer>
		</>
		);
	}

	return (
		<>
		<VerifyContainer id="verify">
			<VerifyWrapper>
			<VerifyRow >
			<Column1>
			<TextWrapper>
				<TopLine>Move to decentralization</TopLine>
				<Heading lightText={false}>Welcome to Certify!</Heading>
				<VerifyH1>Verify Certificates<RefreshIcon src={refresh} alt={"refresh"} onClick={() => {setResult([])}}/> </VerifyH1>

					{loading ? <><div className="loader" /></> : <></>}

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
				
			{result.length > 0 ? (

			<>
			<br></br>
	
			{result.map((item, index) => (
				<div key = {index}>
				<div style={{ backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '10px' }}>
				<h2 style={{ fontSize: '1.5em', color: '#333', marginBottom: '10px'}}>Certificate {index+1} Details</h2>
				<div style={{ display: 'flex', flexDirection: 'column' }}>
					<p  style={{ fontSize: '1.2em', color: '#333', margin: '5px 0' }}>Cerificate Id: {item.CerificateId}</p>
					<p  style={{ fontSize: '1.2em', color: '#333', margin: '5px 0' }}>Candidate Name: {item.CandidateName}</p>
					<p  style={{ fontSize: '1.2em', color: '#333', margin: '5px 0' }}>Candidate Number: {item.CandidateNumber}</p>
					<p  style={{ fontSize: '1.2em', color: '#333', margin: '5px 0' }}>Candidate Address: {item.CandidateAddress}</p>
					<p  style={{ fontSize: '1.2em', color: '#333', margin: '5px 0' }}>Course Code: {item.CourseCode}</p>
					<p style={{ fontSize: '1.2em', color: '#333', margin: '5px 0' }}>Course Id: {item.CourseId}</p>
					<p  style={{ fontSize: '1.2em', color: '#333', margin: '5px 0' }}>Isrevoked: {item.Isrevoked}</p>
					<p style={{ fontSize: '1.2em', color: '#333', margin: '5px 0' }}>Expiration Date: {item.ExpirationDate}</p>
				</div>
				</div>
				<br></br>
				</div>
				
			))}
			
			</> ) :
			
			(<>

			{loading ? <ReloadIcon src={bar} alt={'progrss'}/> : <VerifyH2></VerifyH2>}

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
			<form className="form">
				<div className="form-column">
					<label htmlFor="field1">User Address / Certificate Id</label>
					<input type="text" id="field1" value={Id} placeholder="0xB8A88... / QmP8r4Not..." onChange={(e)=> setId(e.target.value)} />
				</div>
				<br></br>

			</form>
			<div className="button1" onClick={(event) => { DoVerify(event,Id); } }> Get Certificate Details </div>
			</> )}
			</Column1>

			<Column2>
			<ImgWrap>
				<Img src={final} alt="nfts" />
			</ImgWrap>
			</Column2>
			
			</VerifyRow>
			</VerifyWrapper>
		</VerifyContainer>	
		</>
	);
}

