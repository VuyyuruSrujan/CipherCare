import { useEffect , useContext, useState } from "react";
import { NearContext } from "../context";
import { GuestbookNearContract } from "../config";
import { useRouter } from 'next/router';
import { providers } from "near-api-js";  // Import NEAR providers


export default function DoctorForm(){
    const [transactionStatus, setTransactionStatus] = useState(null);
    const router = useRouter();
    const { signedAccountId, wallet } = useContext(NearContext);
    const [alldoc , setAllDoctors] = useState([""])
    useEffect(() => {
        console.log("all doctors",alldoc)
        console.log("currentAccountId",signedAccountId)
        async function fetchDoctors(){
            const all_doctors = await get_all_doctors();
            setAllDoctors(all_doctors);
            const isSender = all_doctors.some((doctor) => doctor.sender === signedAccountId);
            if(isSender){
                const queryString = new URLSearchParams({ all_doctors: JSON.stringify(all_doctors) });
                // localStorage.setItem("doctorsData",queryString)
                router.replace(`/DoctorPagee?${queryString}`);
            }
        }
        fetchDoctors();
        console.log("alldoc",alldoc)

        const urlParams = new URLSearchParams(window.location.search);
    const transactionHash = urlParams.get("transactionHashes");
    if (transactionHash) {
      checkTransactionStatus(transactionHash);
    }

    },[signedAccountId, wallet])

    // async function get_Doctor_Details(){
    //     try {
    //         const doctor_details = await wallet.viewMethod({
    //             contractId:GuestbookNearContract,
    //             method:"get_doctor_by_sender",
    //             args:{signedAccountId},
    //         })
    //         console.log("doctor_details",doctor_details);
    //     } catch (error) {
    //         console.log("doctor_details",error);
    //     }
    // }

    const checkTransactionStatus = async (transactionHash) => {
        try {
          const provider = new providers.JsonRpcProvider("https://rpc.testnet.near.org");
          const result = await provider.txStatus(transactionHash, signedAccountId);
    
          if ((result.status.SuccessValue)) {
            setTransactionStatus("Success",);
            router.replace("/DoctorPagee");
          } else {
            setTransactionStatus("Failed");
          }
        } catch (error) {
          console.error("Error checking transaction status:", error);
          setTransactionStatus("Error");
        }
      };

      async function get_all_doctors() {
        const TDoctors = await wallet.viewMethod({
            contractId: GuestbookNearContract,
            method:"total_doctors",
        });
        const from_index = Math.max(0, TDoctors - 100);
        const all_doctors = await wallet.viewMethod({
            contractId: GuestbookNearContract,
            method: "get_doctors",
            args: { from_index: String(from_index), limit: "10000" },
        });
        console.log("Fetched doctors:", all_doctors);
        return all_doctors;
    }
    

    const DoctorSubmit = async (e) => {
        try {
            e.preventDefault();
            const { DocFirstName , DocLastName , DocEmail , DocDateOfBirth , DocAge ,Specialization} = e.target.elements;
            const doctor_register_details = await wallet.callMethod({
                contractId:GuestbookNearContract,
                method:"doctor_registration_details",
                args : {
                    doctor_first_name: DocFirstName.value ,
                    doctor_last_name : DocLastName.value ,
                    doctor_email : DocEmail.value ,
                    doctor_dob : DocDateOfBirth.value ,
                    doctor_specialization: Specialization.value,
                },
            })
            console.log("doctor_register_details",doctor_register_details)
        } catch (error) {
            console.log("doctor registering error",error);
        }
    }

    return(
        <>
            <div>
                <form className="form" onSubmit={DoctorSubmit}>
                {transactionStatus && (
          <p className={`alert ${transactionStatus === "Success" ? "alert-success" : "alert-danger"}`}>
            Transaction Status: {transactionStatus}
          </p>
        )}
                    <p className="title">Doctor </p>
                    <p className="message">Sign in as a Doctor</p>
                        <div className="flex">
                        <label>
                            <input className="input" type="text" placeholder="" id="DocFirstName" required="" />
                            <span>Firstname</span>
                        </label>

                        <label>
                            <input className="input" type="text" placeholder="" id="DocLastName" required="" />
                            <span>Lastname</span>
                        </label>
                    </div>

                    <label>
                        <input className="input" type="email" placeholder="" id="DocEmail" required="" />
                        <span>Email</span>
                    </label> 
                        
                    <label>
                        <input className="input" type="date" placeholder="" id="DocDateOfBirth" required="" />
                        <span>Date of Birth</span>
                    </label>
                    <label>
                        <input className="input" type="text" placeholder="" id="DocAge" required="" />
                        <span>Age</span>
                    </label>
                    <label>
                        <input className="input" type="text" placeholder="" id="Specialization" required="" />
                        <span>specialization</span>
                    </label>
                    <button className="submit" type="submit" >Submit</button>
                </form>
            </div>
        </>
    );
}