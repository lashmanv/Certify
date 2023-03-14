import React, { useState } from "react";

function Forms() {

    const [ certificateId, setCertificateId ] = useState("");
    const [ certificateURL, setCertificateURL] = useState("");
    const [ candidateName, setCandidateName ] = useState("");
    const [ candidateAddress, setCandidateAddress ] = useState("");
    const [ courseName, setCourseName ] = useState("");
    const [ courseId, setCourseId ] = useState("");
    const [ expirationDate, setExpirationDate ] = useState("");
        

    const handleSubmit = (event) => {
        try{
            console.log(certificateId);
            console.log(certificateURL);
            event.preventDefault();
            // handle form submission here
        }
        catch {

        }
    };

  return (
    <div className="form" onSubmit={handleSubmit}>

    <label htmlFor="name"> certificateId: </label>
    <input type="text" className="hidden" required onChange={(event) => setCertificateId(event.target.value)} placeholder="certificate id" />

    <label htmlFor="name"> certificateURL </label>
    <input type="text" className="hidden" onChange={(event) => setCertificateURL(event.target.value)} placeholder="certificate url" />

    <label htmlFor="name"> candidateName </label>
    <input type="text" className="hidden" onChange={(event) => setCandidateName(event.target.value)} placeholder="candidate name" />

    <label htmlFor="name"> candidateAddress </label>
    <input type="text" className="hidden" onChange={(event) => setCandidateAddress(event.target)} placeholder="wallet address" />

    <label htmlFor="name"> courseName </label>
    <input type="text" className="hidden" onChange={(event) => setCourseName(event.target)} placeholder="course name" />

    <label htmlFor="name"> courseId </label>
    <input type="text" className="hidden" onChange={(event) => setCourseId(event.target)} placeholder="course id" />

    <label htmlFor="name"> expirationDate </label>
    <input type="text" className="hidden" onChange={(event) => setExpirationDate(event.target)} placeholder="expiration date" />

    <div className="button" onClick={(event) => {handleSubmit(event)}}> Mint </div>

    </div>
  );
}

export default Forms;