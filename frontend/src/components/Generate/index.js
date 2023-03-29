import React, {useState, useEffect} from "react";
import { Link } from 'react-router-dom'; 
		
import { ethers } from "ethers";
import {
	InfoContainer, 
	InfoWrapper, 
	InfoRow, 
	Column1,
	TextWrapper, 
	TopLine, 
	Heading, 
	Subtitle, 
	BtnWrap,
	Column2,
	ImgWrap,
	Img, 
} from './GenerateElements'
import { Button1, Button3 } from '../ButtonElements';
import final from "../../images/generate.jpg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { create } from "ipfs-http-client";

import Institution from "../../artifacts/contracts/Institution.sol/Institution.json";

export default function Generate(props) {

	const InstitutionAddress = "0xc13FFC9bC07F427c370e4442cE4e8E87BcC38411"

	const [success, setSuccess] = useState(true);
	const [error, setError] = useState(true);
	
	const [mint, setMint] = useState(false);
	
	useEffect(() => {
		setTimeout(() => setError(false), 5000);
		setTimeout(() => setSuccess(false), 5000);
	  }, [error], [success], [mint]);

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

	const projectId = '2Mt1McsvqeQE9IiUOFYs9fKzib6'; // Replace with your Infura project ID
	const projectSecret = "979551b73d6cd1d689f34376691eac0e";
	const authorization = "Basic " + btoa(projectId + ":" + projectSecret);

	const ipfs = create({
		url: "https://ipfs.infura.io:5001/api/v0",
		headers:{
		  authorization
		}
	})

	const [file, setFile] = useState(null);
	const [loading, setLoading] = useState(false);

	const [certificateId, setCertificateId] = useState(null);
	const [candidateName, setCandidateName] = useState('');
	const [candidateNumber, setCandidateNumber] = useState('');
	const [candidateAddress, setCandidateAddress] = useState('');
	const [courseName, setCourseName] = useState('');
	const [courseId, setCourseId] = useState('');
	const [expirationDate, setExpirationDate] = useState('');
	const [aDate, setActualDate] = useState('');

	function date(dateValue) {
		const unix = new Date(dateValue).getTime() / 1000;
		setExpirationDate(unix);

		const date = new Date(unix * 1000);
		const formattedDate = date.toISOString().slice(0, 10);

		setActualDate(formattedDate);
	}

	const handleFileChange = (event) => {
		if (!event.files[0].type.match('image/png')) {
			setFile(null);
			notify('Please upload a PNG file');
		}
		else{
			setFile(event.files[0]);
		}
	};

	const another = () => {
		setFile(null);
	};

	function view(event, cid) {
		event.preventDefault();
		console.log(cid);
		window.open("https://gateway.pinata.cloud/ipfs/"+cid, "_blank");
	};

	function etherscan() {
		// event.preventDefault();
		console.log(mint);
		window.open("https://goerli.etherscan.io/tx/"+mint, "_blank");
	};

	const upload = async (event) => {
		try{
			event.preventDefault();

			const files = file;

			console.log(files);
		
			if (!files || files.length === 0) {

				notify("No files selected");
			}
		
			// upload files
			const result = await ipfs.add(files);

			console.log(result);
			setCertificateId(result.path);

			return result.path;
		}
		catch(e){
			setLoading(false);
			notify(e.reason);
			console.log(e);
		}
	};

	const handleSubmit = async (event) => {
        try{
			if(
				candidateName && 
				candidateNumber && 
				courseName &&
				courseId &&
				candidateAddress &&
				expirationDate
			) 
			{
				event.preventDefault();

				setLoading(true);

				let id = await upload(event);

				let val = [[id],[candidateName],[candidateNumber],[candidateAddress],[courseName],[courseId],[expirationDate]]

				console.log(val);

				DoMint(val);

				console.log(id);
				console.log(candidateName);
				console.log(candidateNumber);
				console.log(courseName);
				console.log(courseId);
				console.log(candidateAddress);
				console.log(expirationDate);

				event.preventDefault();
			}
			else {
				notify("Fill the all the input fields in form");
			}
        }
        catch {
			notify(error.reason);
        }
    };

	const DoMint = async (val) =>{

		console.log(props.network);

		// if(!props.InstitutionAddress || props.network!==80001) return;

		try{
			
			let contract = new ethers.Contract(InstitutionAddress, Institution, props.signer);

			const transaction = await contract.generateCertificate(
				val[0],
				val[1],
				val[2],
				val[3],
				val[4],
				val[5],
				val[6]
				);
			await transaction.wait();

			setMint(transaction.hash);

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

	
	
	if(!props.address) {
		return (
			<>
			<InfoContainer id="generate" >
				<InfoWrapper>
				<InfoRow >
					<Column1>
					<TextWrapper>
						<TopLine>Move to decentralization</TopLine>
						<Heading lightText={false}>Welcome to Certify!</Heading>
						<Subtitle darkText={true}>
						With our easy-to-use tool, you can create professional-looking certificates for any occasion.
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
				</InfoRow>
				</InfoWrapper>
			</InfoContainer>
			</>
		);
	}
	if(mint) {
		
		return (
			<>
			<InfoContainer id="generate">
				{notify("Transaction Hash: "+mint)}
			
				<InfoWrapper>
				<InfoRow >
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
						
						<Subtitle darkText={true}>Certificate Minted successfully</Subtitle>
						<Subtitle darkText={true}>Transaction Hash: </Subtitle>
						<Subtitle darkText={true}>Verify on etherscan:</Subtitle>
						<a href="#" onClick={() => {etherscan();}}>
							<Subtitle darkText={true}>{mint}</Subtitle>
						</a>
						<Subtitle darkText={true}>View the minted certificate</Subtitle>
						<a href="#" onClick={(event) => {view(event, certificateId);}}>
							<Subtitle darkText={true}>{certificateId}</Subtitle>
						</a>
						
						<BtnWrap>
						<Button1 to="/verify" onClick={toggleHome}> Verify Certificate </Button1>
						</BtnWrap>

						<br></br>
						
						<Button3 onClick={another}> Mint another Certificate</Button3>

					</TextWrapper>
					</Column1>
					<Column2>
					<ImgWrap>
						<Img src={final} alt="nfts"/>
					</ImgWrap>
					</Column2>
				</InfoRow>
				</InfoWrapper>
			</InfoContainer>
			</>
		);
	}
	
	else {
		return (
		<>
		<InfoContainer id="generate" >
			<InfoWrapper>
			<InfoRow >
				<Column1>
				<TextWrapper>
					<TopLine>Move to decentralization</TopLine>
					<Heading lightText={false}>Welcome to Certify!</Heading>
					<TopLine>Upload file to IPFS</TopLine>

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

				{ipfs && (
				<>

				{<> </>}:

				<>

				{file ?
					(
						<>
							<Subtitle darkText={true}>Selected file: "{file.name.slice(0, 20)}"</Subtitle>
						</>
					) :
					(
						<>
						<form className="form">
						<div className="form-column">
							<input type="file" id="file-input" onChange={(event) => { handleFileChange(event.target); } } />
						</div>
						</form>
						</>
					)
				}

				<>
					<form className="form">
						<div className="form-column">
							<label htmlFor="field1">Candidate Number</label>
							<input type="text" id="field1" value={candidateNumber} onChange={e => setCandidateNumber(e.target.value)} />
							<label htmlFor="field2">Course Id</label>
							<input type="text" id="field2" value={courseId} onChange={e => setCourseId(e.target.value)} />
							<label htmlFor="field3">Candidate Address</label>
							<input type="text" id="field3" value={candidateAddress} onChange={e => setCandidateAddress(e.target.value)} />
						</div>
						<div className="form-column">
							<label htmlFor="field4">Candidate Name</label>
							<input type="text" id="field4" value={candidateName} onChange={e => setCandidateName(e.target.value)} />
							<label htmlFor="field5">Course Name</label>
							<input type="text" id="field5" value={courseName} onChange={e => setCourseName(e.target.value)} />
							<label htmlFor="field6">Expiration Date</label>
							<input type="date" id="field6" value={aDate} onChange={e => date(e.target.value)} />
						</div>
						<br></br>

					</form>
					<div className="button" onClick={(event) => { handleSubmit(event); } }> Mint </div>
				</>
				</>
				</>
			)}
				</Column1>

				<Column2>
				<ImgWrap>
					<Img src={final} alt="nfts"/>
				</ImgWrap>
				</Column2>
				
			</InfoRow>
			</InfoWrapper>
		</InfoContainer>

		</>
		);
	}
}
