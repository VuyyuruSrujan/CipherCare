import { useRouter } from 'next/router';
import { useEffect } from "react";


export default function Landing({currentAccountId}){
    const router = useRouter();
    useEffect(() => {
        if(currentAccountId == undefined){
            console.log("connect to wallet");
        }else{
            console.log("current id",currentAccountId)
        }
    } )

    function PatientPage(){
        if(currentAccountId == undefined){
            alert("connect to wallet");
        }else{
            router.push("/Form1")
        }
    }
    function DoctorPage(){
        if(currentAccountId == undefined){
            alert("connect to wallet");
        }else{
            router.push("/Doctorp")
        }
    }
    return(
        <>
            <div>
                <h1>Project Name</h1>
            </div>
            <button onClick={PatientPage}>Connect as a Patient</button><br /><br /><br />
            <button onClick={DoctorPage}>Connect as Doctor</button>
        </>
    );
}