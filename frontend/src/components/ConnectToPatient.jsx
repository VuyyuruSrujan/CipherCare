// import { useState, useEffect, useContext } from "react";
// import DoctorNavbar from "./DoctorNavbar";
// import { NearContext } from "../context";
// import { GuestbookNearContract } from "../config";

// export default function() {
//     const { signedAccountId, wallet } = useContext(NearContext);
//     const [patients, setPatients] = useState([]);
//     const [searchId, setSearchId] = useState("");
//     const[foundPatientdet , setFoundPatient] = useState("")

//     // Fetch the last 10 patients' messages
//     const getLast10Messages = async () => {
//         const total_messages = await wallet.viewMethod({
//             contractId: GuestbookNearContract,
//             method: "total_messages",
//         });
//         const from_index = Math.max(0, total_messages - 100);
//         return wallet.viewMethod({
//             contractId: GuestbookNearContract,
//             method: "get_messages",
//             args: { from_index: String(from_index), limit: "10000" },
//         });
//     };

//     // Search for a specific patient using a for loop
//     async function SearchPatient() {
//         const allPatients = await getLast10Messages();
//         setPatients(allPatients);

//         let foundPatient = null;
//         for (let i = 0; i < allPatients.length; i++) {
//             if (allPatients[i].sender === searchId) {
//                 foundPatient = allPatients[i];
//                 setFoundPatient(foundPatient);
//                 break;
//             }
//         }

//         if (foundPatient) {
//             console.log("Patient profile:", foundPatient);
//         } else {
//             console.log("No matching patient found for ID:", searchId);
//             alert("no Patient found")
//         }
//     }

//     return (
//         <>
//         <div id="info">
//             <div>
//                 <input
//                     type="search"
//                     id="SearchBar"
//                     placeholder="search for patient account id here"
//                     value={searchId}
//                     onChange={(e) => setSearchId(e.target.value)}
//                 />
//                 <button className="btn" onClick={SearchPatient}> Search </button>
//             </div>
//             <div id="mainbox">
//                 <div id="LeftBox">
//                     <div id="step1">
//                         <b>STEP-1 : SEARCH FOR PATIENT BY HIS ACCOUNTID</b><br />
//                         <img src="searchimage.jpg" id="searchimg" /><br />
//                         <p> Ex: srujan.testnet </p>
//                         <p>Srujan1.testnet</p>
//                     </div>
//                     <div id="step2"><br /><br />
//                         <b>STEP-2 : IF PATIENT EXISTS THEN SEND REQUEST TO HIM</b><br />
//                         <img src="requestSending.jpg" id="requestimg" />
//                     </div>
//                 </div>
//                 <div id="RightBox">
//                     <b>STEP-3: IF HE ACCEPTS YOUR REQUEST THEN WRITE PRESCRIPTION</b><br />
//                     <img src="prescrip.jpeg" />
//                 </div>
//             </div>
//         </div>
//             <div id="DocNav">
//                 <DoctorNavbar />
//             </div>
//         <div id="PatDat">
//             <p>PatientID:<b>{foundPatientdet.sender}</b></p><br />
//             <p>FullName:<b> {foundPatientdet.first_name} {foundPatientdet.last_name} </b></p>
//             <p>Email:<b>{foundPatientdet.email}</b></p>
//             <p>Age:<b>{foundPatientdet.Age}</b></p>
//         </div>
//         </>
//     );
// }

import { useState, useEffect, useContext } from "react";
import DoctorNavbar from "./DoctorNavbar";
import { NearContext } from "../context";
import { GuestbookNearContract } from "../config";
import { Router } from "next/router";
import { useRouter } from 'next/router';

export default function() {
    const { signedAccountId, wallet } = useContext(NearContext);
    const [patients, setPatients] = useState([]);
    const [searchId, setSearchId] = useState("");
    const [foundPatientdet, setFoundPatient] = useState(null); // Set initial state to null
    const router = useRouter();

    // Fetch the last 10 patients' messages
    const getLast10Messages = async () => {
        const total_messages = await wallet.viewMethod({
            contractId: GuestbookNearContract,
            method: "total_messages",
        });
        const from_index = Math.max(0, total_messages - 100);
        return wallet.viewMethod({
            contractId: GuestbookNearContract,
            method: "get_messages",
            args: { from_index: String(from_index), limit: "10000" },
        });
    };

    // Search for a specific patient using a for loop
    async function SearchPatient() {
        const allPatients = await getLast10Messages();
        setPatients(allPatients);

        let foundPatient = null;
        for (let i = 0; i < allPatients.length; i++) {
            if (allPatients[i].sender === searchId) {
                foundPatient = allPatients[i];
                setFoundPatient(foundPatient);
                break;
            }
        }

        if (foundPatient) {
            console.log("Patient profile:", foundPatient);
        } else {
            console.log("No matching patient found for ID:", searchId);
            alert("No patient found");
            setFoundPatient(null); // Reset if no patient found
        }
    }
    function reqfun(){
        var ReqReason = document.getElementById("docTxt").value;
        if(ReqReason == null || ReqReason == ""){
            alert("fill the note")
        }else{
            alert("req sent")
        }
    }
    function BacktoConnectPati(){
        try {
            router.push('/Doctorp')
        } catch (error) {
            console.log("error",error)
        }
        
    }

    return (
        <>
            {foundPatientdet ? (
                <>
                    <div id="PatDat">
                        <p>PatientID: <b>{foundPatientdet.sender}</b></p>
                        <p>FullName: <b>{foundPatientdet.first_name} {foundPatientdet.last_name}</b></p>
                        <p>Email: <b>{foundPatientdet.email}</b></p>
                        <p>Age: <b>{foundPatientdet.Age}</b></p>
                        <div id="reqBox">
                            <p><b>Request Patient to connect</b></p>
                            <label>Note:</label><br />
                            <textarea  placeholder="Note the reason that why you wanna connect to patient" id="docTxt" required/>
                        </div>
                        <div id="Btns">  <button className="btn" onClick={reqfun}>REQUEST</button> <button className="btn" id="DocBackbtn" onClick={BacktoConnectPati}>BACK</button>  </div>
                    </div>
                </>
            ) : (
                // Display search info when no patient is found
                <div id="info">
                    <div>
                        <input
                            type="search"
                            id="SearchBar"
                            placeholder="search for patient account id here"
                            value={searchId}
                            onChange={(e) => setSearchId(e.target.value)}
                        />
                        <button className="btn" onClick={SearchPatient}>Search</button>
                    </div>
                    <div id="mainbox">
                        <div id="LeftBox">
                            <div id="step1">
                                <b>STEP-1: SEARCH FOR PATIENT BY HIS ACCOUNT ID</b><br />
                                <img src="searchimage.jpg" id="searchimg" /><br />
                                <p>Ex: srujan.testnet</p>
                                <p>Srujan1.testnet</p>
                            </div>
                            <div id="step2"><br /><br />
                                <b>STEP-2: IF PATIENT EXISTS THEN SEND REQUEST TO HIM</b><br />
                                <img src="requestSending.jpg" id="requestimg" />
                            </div>
                        </div>
                        <div id="RightBox">
                            <b>STEP-3: IF HE ACCEPTS YOUR REQUEST THEN WRITE PRESCRIPTION</b><br />
                            <img src="prescrip.jpeg" />
                        </div>
                    </div>
                    
                </div>
            )}
            <div id="DocNav">
                <br /><br /><br /><br />
                <DoctorNavbar />
            </div>
        </>
    );
}

