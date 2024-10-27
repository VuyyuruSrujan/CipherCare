import { useState, useEffect, useContext } from "react";
import { NearContext } from "../context";
import { GuestbookNearContract } from "../config";
import { providers } from "near-api-js";
import { useRouter } from 'next/router';


export default function PatientPage() {
  const router = useRouter();
  const { messages } = router.query;
  const { signedAccountId, wallet } = useContext(NearContext);
  const [parsedMessages, setParsedMessages] = useState([]);
  const [userName , setuserName] = useState(["Your Name"]);
  const [occupation , setoccupation] = useState(["your occupation"]);
  const [DateOfBirth , setDateOfBirth] = useState(["Date of Birth"]);

useEffect(() => {
  if (messages) {
    let parsed;
    try {
      parsed = JSON.parse(messages); // Parse messages back to array
      setParsedMessages(parsed);
      console.log("Received messages:", parsed);
    } catch (error) {
      console.error("Failed to parse messages:", error);
      return; // Exit early if parsing failed
    }
    
    if (Array.isArray(parsed)) { // Check if parsed is an array
      for (let i = 0; i < parsed.length; i++) {
        if (parsed[i].sender === signedAccountId) {
          const fullName = `${parsed[i].first_name} ${parsed[i].last_name}`;
          console.log("fullname", fullName);
          const occupa = `${parsed[i].occupation}`;
          console.log("occupation", occupa)
          const DateOfBirth = `${parsed[i].dob}`
          setDateOfBirth(DateOfBirth)
          setoccupation(occupa);
          setuserName(fullName);
        }
      }
    } else {
      console.error("Parsed messages is not an array");
    }
  }
}, [messages, signedAccountId]);



  const deleteAll = async (e) => {
    try {
      e.preventDefault();

      const result = await wallet.callMethod({
        contractId: GuestbookNearContract,
        method: "delete_all_messages",
        args:{},
      });

      console.log("deletion result:", result);
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  return (
    <>
      <div id="mainBox">
        <div id="horzBar">
          {/* <FontAwesomeIcon icon={faUser} size="2xl" style={{color: "#a4b6b1",}}  id="Profileicon"/> */}
          <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="108px" fill="#FFFFFF" className="proficon">
            <path d="M480-512q-44.55 0-74.77-30.22Q375-572.45 375-617.5t30.23-74.78Q435.45-722 480-722t74.78 29.72Q585-662.55 585-617.5t-30.22 75.28Q524.55-512 480-512ZM212-232v-47q0-23 14-42t37-30q57-25 110.97-38t106-13Q532-402 586-389t110.48 38.4q23.69 10.71 37.6 29.65Q748-302 748-279v47H212Zm22-22h492v-25q0-15-10.5-29T686-332q-51-25-102.19-36.5Q532.63-380 480-380t-104.31 11.5Q324-357 274-332q-19 10-29.5 24T234-279v25Zm246-280q35 0 59-24t24-59q0-35-24-59t-59-24q-35 0-59 24t-24 59q0 35 24 59t59 24Zm0-83Zm0 363Z" />
          </svg>
          Name:    <b>{userName}   - [{occupation}]</b><br />
        </div>
        <div id="squareBox">
          <center>
            <div id="Accountid"> 
              Signed Account id  :  <b>{signedAccountId}</b><br /><br />
              Full Name : <b>{userName}</b><br /><br />
              Date of birth : <b>{DateOfBirth}</b>
            </div>
          </center>
        </div>
      </div>

      <div>
      <button onClick={deleteAll}>delete all</button>
    </div>
    </>
  );
}
