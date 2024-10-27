import { useEffect , useContext } from "react";
import { NearContext } from "../context";
import { GuestbookNearContract } from "../config";


export default function DoctorPage(){
    const { signedAccountId, wallet } = useContext(NearContext);

    useEffect(() => {
        console.log("currentAccountId",signedAccountId)
    } )

    async function DoctorSubmit(e){
        try {
            e.preventDefault();
            const { DocFirstName , DocLastName , DocEmail , DocDateOfBirth , DocAge ,Specialization} = e.target.elements;
            const doctor_register_details = await wallet.callMethod({
                contractId:GuestbookNearContract,
                method:"doctor_registration_details",
                args : {
                    doc_first_nm: DocFirstName.value ,
                    doc_last_nm : DocLastName.value ,
                    doc_email : DocEmail.value ,
                    doc_DOB : DocDateOfBirth.value ,
                    doc_Age : DocAge.value,
                    Specialization: Specialization.value,
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