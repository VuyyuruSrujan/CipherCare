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
                <h1 id="ProjectTitle"><b>CipherCare</b></h1>
                <div id="line"></div>
            </div>
            <div id="Mainbtns">
                <button onClick={PatientPage} className='btn' id="maincnnbtn">Connect as a Patient</button><br /><br /><br />
                <button onClick={DoctorPage} className='btn' id="maincnnbtn">Connect as Doctor</button>
            </div>

            <div id="MainPageMain">
                <div>
                    <img src='img1.jpg' id="img1"/>
                    <p id="txt1">
                        <p> <b><h2> Unlock a New Era in Medical Care </h2></b></p> 
                        <p>
                        <h6 id="matt1">In the fast-paced world of healthcare, accessing vital information can mean the difference between life and loss. <b>CipherCare</b> is here to bridge the gaps, revolutionizing how you manage and share your medical records
                        </h6>
                        </p>           
                    </p>
                </div>
                <div>
                    <img src='img2.jpg'  id="img2"/>
                    <p id="txt2">
                    <p id="head2"> <b><h2>Our Solution: Empowering You </h2></b></p> 
                    <p>
                        <h6 id="matt2">Say goodbye to fragmented medical care. With CipherCare, you're in control. Our blockchain- powered network ensures your data is secure, accessible, and in your hands.                       </h6>
                        </p>   
                    </p>
                </div>
                <div>
                <img src='img3.jpg'  id="img3"/>
                <p id="txt3">
                    <p id="head3"> <b><h2>Trust in Authenticity </h2></b></p> 
                    <p>
                        <h6 id="matt3"> Every document shared on our network comes from verified hospitals, guaranteeing authenticity and eliminating data leaks.</h6>
                        </p>   
                    </p>
                </div>
            </div>
           
        </>
    );
}