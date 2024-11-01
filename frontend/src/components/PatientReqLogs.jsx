import { useState, useEffect, useContext } from "react";
import { NearContext } from "../context";
import { GuestbookNearContract } from "../config";
import { providers } from "near-api-js";  // Import NEAR providers
import { useRouter } from 'next/router';

export default function PatientReqLogs(){
    const { signedAccountId, wallet } = useContext(NearContext);
    const [transactionStatus, setTransactionStatus] = useState(null);

    useEffect(() => {
        async function getAlll(){
            const req = await getAllReq()
            console.log("all requests", req);
        }
        getAlll()

        const urlParams = new URLSearchParams(window.location.search);
        const transactionHash = urlParams.get("transactionHashes");
        if (transactionHash) {
          checkTransactionStatus(transactionHash);
        }
    },[]);

    const checkTransactionStatus = async (transactionHash) => {
        try {
          const provider = new providers.JsonRpcProvider("https://rpc.testnet.near.org");
          const result = await provider.txStatus(transactionHash, signedAccountId);
    
          if ((result.status.SuccessValue)) {
            setTransactionStatus("Success");
            console.log("transaction success");
            alert("Request sent successfully");
          } else {
            setTransactionStatus("Failed");
          }
        } catch (error) {
          console.error("Error checking transaction status:", error);
          setTransactionStatus("Error");
        }
      };

    const getAllReq = async () => {
        const total_messages = await wallet.viewMethod({
          contractId: GuestbookNearContract,
          method: "total_messages",
        });
        const from_index = Math.max(0, total_messages - 100);
        return wallet.viewMethod({
          contractId: GuestbookNearContract,
          method: "get_Requests",
          args: { from_index: String(from_index), limit: "10000" },
        });
      };
    return(
        <>
            <div>
                <center><b><h3>You will find requests from doctors here</h3></b></center>

            </div>
        </>
    );

}