import { useState, useEffect, useContext } from "react";
import { NearContext } from "../context";
import { GuestbookNearContract } from "../config";
import { providers } from "near-api-js";  // Import NEAR providers
import { useRouter } from 'next/router';

export default function Form({ currentAccountId }) {
  const { signedAccountId, wallet } = useContext(NearContext);
  const [transactionStatus, setTransactionStatus] = useState(null);
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  var occupation = 'Patient'

  useEffect(() => {
    const fetchMessages = async () => {
      const messages = await getLast10Messages();
      setMessages(messages);
      console.log("Fetched messages:", messages);
      const isSender = messages.some((message) => message.sender === signedAccountId);
      if (isSender) {
        const queryString = new URLSearchParams({ messages: JSON.stringify(messages) });
        router.replace(`/Patientp?${queryString}`);
      }
    };
    fetchMessages();
  
    const urlParams = new URLSearchParams(window.location.search);
    const transactionHash = urlParams.get("transactionHashes");
    if (transactionHash) {
      checkTransactionStatus(transactionHash);
    }
  }, []);
  

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

  // Function to check transaction status on NEAR blockchain
  const checkTransactionStatus = async (transactionHash) => {
    try {
      const provider = new providers.JsonRpcProvider("https://rpc.testnet.near.org");
      const result = await provider.txStatus(transactionHash, signedAccountId);

      if ((result.status.SuccessValue)) {
        setTransactionStatus("Success",);
        router.replace("/Patientp");
      } else {
        setTransactionStatus("Failed");
      }
    } catch (error) {
      console.error("Error checking transaction status:", error);
      setTransactionStatus("Error");
    }
  };

  const onSubmit = async (e) => {
    try {
      e.preventDefault();

      const {PFirstName, PLastName, Pemail, PDOB, Age } = e.target.elements;

      const result = await wallet.callMethod({
        contractId: GuestbookNearContract,
        method: "add_message",
        args: {
          first_name: PFirstName.value,
          last_name: PLastName.value,
          email: Pemail.value,
          dob: PDOB.value,
          occupation : occupation,
          Age:Age.value,
        },
      });

      console.log("Transaction result:", result);
    } catch (error) {
      console.error("Error submitting message:", error);
    }
  };



  return (
    <>
  <form className="form" onSubmit={onSubmit} >
  
    <p className="title">Patient </p>
    <p className="message"><b>Register as a Patient</b></p>
    {transactionStatus && (
          <p className={`alert ${transactionStatus === "Success" ? "alert-success" : "alert-danger"}`}>
            Transaction Status: {transactionStatus}
          </p>
        )}
        <div className="flex">
        <label>
            <input className="input" type="text" placeholder=""id="PFirstName" required="" />
            <span>Firstname</span>
        </label>

        <label>
            <input className="input" type="text" placeholder="" id="PLastName" required="" />
            <span>Lastname</span>
        </label>
    </div>  
            
    <label>
        <input className="input" type="email" placeholder="" id="Pemail" required="" />
        <span>Email</span>
    </label> 
        
    <label>
        <input className="input" type="date" placeholder="" id="PDOB" required="" />
        <span>Date of birth</span>
    </label>
    <label>
        <input className="input" type="text" placeholder="" id="Age" required="" />
        <span> Age </span>
    </label>
    <button className="submit" type="submit">Submit</button>
  </form>
    
    </>
  );
}

