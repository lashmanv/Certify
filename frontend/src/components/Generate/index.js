import React, {useState, useEffect} from "react";
import { Link } from 'react-router-dom'; 

import { Button, Form } from 'react-bootstrap';
		
import { ethers } from "ethers";
import {
	Top,
	InfoContainer, 
	InfoWrapper, 
	InfoWrapper1, 
	InfoRow, 
	InfoRow1, 
	Column1,
	TextWrapper, 
	TopLine, 
	Heading, 
	Heading1, 
	Subtitle, 
	BtnWrap,
	Column2,
	Column3,
	ImgWrap,
	Img, 
} from './GenerateElements'
import { Button1,Button2 } from '../ButtonElements';
import final from "../../images/icon1.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Certify from "../../artifacts/contracts/Certify.sol/Certify.json";
import Institution from "../../artifacts/contracts/Institution.sol/Institution.json";

import { create } from "ipfs-http-client";

export default function Generate(props) {
	
	const [totalSupply, setTotalSupply] = useState(null);

	const [success, setSuccess] = useState(true);
	const [error, setError] = useState(true);
	
	const [event, setEvent] = useState({from: null, to: null, tokenId: null});
	const [mint, setMint] = useState(false);
	
	const CertifyAddress = "0xd022D6eaFad443E6A6f8E31Fa2dfd0F846799E61"
	const InstitutionAddress = "0xa2d66997aa33FD2D0aA5f65D95160ddf971851a8"

	const DoMint = async (certificateId,
		certificateURL,
		candidateName,
		candidateNumber,
		courseName,
		courseId,
		candidateAddress,
		expirationDate) =>{

		console.log(props.network);

		if(!props.contract1 || !props.contract2 || props.network!==5) return;
		try{
			let t = "QmY5xYxWBQGWbk7RFQWspdmNJ35aHxSQ9qfdmKhPDajAM7";
			const transaction = await props.contract2.generateCertificate(
				[['t']],
				['["1"]'],
				['["Test"]'],
				['["1"]'],
				[CertifyAddress],
				['["Test"]'],
				['["1"]'],
				['["1"]']);
			await transaction.wait;
			Institution.on("Transfer", (from, to, tokenId) => {
				setEvent({from:from,to:to,tokenId:tokenId});
				setMint("Token Id : "+ parseInt(tokenId)+" succesfully minted to "+to);
				console.log(event);
			});
			notify(transaction.hash);
			console.log(transaction);
			setMint(true);
			}
		catch (error) {
			if((error?.data?.message.includes("user rejected transaction") || error?.message.includes("user rejected transaction")))	
				setError("user rejected transaction");
				notify("User rejected transaction");
			console.log(error);
		}
	};

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
	const [cid, setCid] = useState(null);
	const [val, setVal] = useState(null);
	const [loading, setLoading] = useState(false);

	const handleFileChange = (event) => {
		setFile(event.files[0]);
	};

	const another = () => {
		setFile(null);
		setCid(null);
	};

	function view(event, cid) {
		event.preventDefault();
		console.log(cid);
		window.open("https://gateway.pinata.cloud/ipfs/"+cid, "_blank");
	  };

	const onSubmitHandler = async (event) => {
		try{
			setLoading(true);
			event.preventDefault();
			const form = event.target;
			const files = file;

			console.log(files);
		
			if (!files || files.length === 0) {
				setLoading(false);

				return alert("No files selected");
			}
		
			// upload files
			const result = await ipfs.add(files);
		
			form.reset();

			console.log(result);
			setVal("File Uploaded");
			if(result.path != null) {setLoading(false)};
			setCid(result.path);
		}
		catch(e){
			setLoading(false);
			console.log(e);
		}
	};

	const [ certificateId, setCertificateId ] = useState(null);
    const [ certificateURL, setCertificateURL] = useState(null);
    const [ candidateName, setCandidateName ] = useState(null);
    const [ candidateNumber, setCandidateNumber ] = useState(null);
    const [ candidateAddress, setCandidateAddress ] = useState(null);
    const [ courseName, setCourseName ] = useState(null);
    const [ courseId, setCourseId ] = useState(null);
    const [ expirationDate, setExpirationDate ] = useState(null);
        

    const handleSubmit = (event) => {
        try{
			if(certificateId && 
				certificateURL && 
				candidateName && 
				candidateNumber && 
				courseName &&
				courseId &&
				candidateAddress &&
				expirationDate
			) 
			{
				
				DoMint(certificateId, 
					certificateURL,
					candidateName,
					candidateNumber,
					courseName,
					courseId,
					candidateAddress,
					expirationDate);

				console.log(certificateId);
				console.log(certificateURL);
				console.log(candidateName);
				console.log(candidateNumber);
				console.log(courseName);
				console.log(courseId);
				console.log(candidateAddress);
				console.log(expirationDate);

				event.preventDefault();
			}
			// else {
			// 	alert("Fill the form");
			// }
            // handle form submission here
        }
        catch {

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
			<InfoContainer id="generate" >
				<InfoWrapper>
				<InfoRow >
					<Column1>
					<TextWrapper>
						{event.tokenId!==0 ? (<><Subtitle darkText={true}>Certificate ID : {parseInt(event.tokenId)} Minted successfully</Subtitle> </>) : (false)}
						<Subtitle darkText={true}>View the minted certificate</Subtitle>
						<BtnWrap>
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
						<Button1 to="/verify" onClick={toggleHome}> Verify Certificate </Button1>
					</BtnWrap>
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
		<InfoContainer id="generate" primary={true}>
			<Top primary={true}>
			<TopLine primary={true}>Move to decentralization</TopLine>
			<Heading primary={true} lightText={false}>Welcome to Certify!</Heading>
			<Subtitle primary={true} darkText={true}>
			Fill and Submit the below form:
			<br></br>
			</Subtitle>	
			</Top>

	 		<InfoWrapper primary={true}>

			<InfoRow primary={true}>
				
			<Column1 primary={true}>


			<label htmlFor="name" id="label"> certificateId: </label>
			<input type="text" className="hidden" required onChange={(event) => setCertificateId(`["${event.target.value}"]`)} placeholder="certificate id" />

			<label htmlFor="name" id="label"> candidateName </label>
			<input type="text" className="hidden" onChange={(event) => setCandidateName(`["${event.target.value}"]`)} placeholder="candidate name" />

			<label htmlFor="name" id="label"> courseName </label>
			<input type="text" className="hidden" onChange={(event) => setCourseName(`["${event.target.value}"]`)} placeholder="course name" />

			<label htmlFor="name" id="label"> candidateAddress </label>
			<input type="text" className="hidden" onChange={(event) => setCandidateAddress(`["${event.target.value}"]`)} placeholder="wallet address" />

			</Column1>
			<Column2 primary={true}>

			<label htmlFor="name" id="label"> certificateCID </label>
			<input type="text" className="hidden" onChange={(event) => setCertificateURL(`["${event.target.value}"]`)} placeholder="certificate cid" />

			<label htmlFor="name" id="label"> candidateNumber </label>
			<input type="text" className="hidden" onChange={(event) => setCandidateNumber(`["${event.target.value}"]`)} placeholder="candidate rollno" />

			<label htmlFor="name" id="label"> courseId </label>
			<input type="text" className="hidden" onChange={(event) => setCourseId(`[${event.target.value}]`)} placeholder="course id" />

			<label htmlFor="name" id="label"> expirationDate </label>
			<input type="date" className="hidden" onChange={(event) => setExpirationDate([1])} placeholder="expiration date" />
			
			
			</Column2>

			<Column3 >
			{ipfs && (
				<>
				<div className="custom-file-input">
				
				{loading ? <><div className="loader" /></> :

				<>
				<Form onSubmit={onSubmitHandler}>

				{cid == null ? 
				(
					file ? 
					(
						<>
						<TopLine>Upload file to IPFS</TopLine>
						<Subtitle primary={true} darkText={true}>Selected file</Subtitle>
						<Subtitle primary={true} darkText={true}>"{file.name.slice(0, 20)}"</Subtitle>
						<Button type="submit">Upload file</Button>
						</>
					) : 
					(
						<>
						<TopLine>Upload file to IPFS</TopLine>
						<label htmlFor="file-input" className="btn"> Choose file </label>
						<input type="file" id="file-input" className="hidden" onChange={(event) => {handleFileChange(event.target);}} />
						</>
					)
				) : 
				(
					<> 
					<TopLine>{val}</TopLine>
					<Subtitle darkText={true}> IPFS CID: <a href="#" onClick={(event) => view(event,cid)}> {cid} </a> </Subtitle>
					<Button onClick={() => another()}>Upload another certificate</Button>
					</> 
				)
				}
			
				</Form> </>}
				</div>
				</>
			)}

			
			<br></br>
			<div className="button" onClick={(event) => {handleSubmit(event)}}> Mint </div>
			
			</Column3>
			</InfoRow>
			</InfoWrapper>
			</InfoContainer>
		</>
		);
	}
}
