import { useState, useEffect, useContext } from "react";
import { NearContext } from "../context";
import { GuestbookNearContract } from "../config";
import { useRouter } from 'next/router';
import DoctorNavbar from "./DoctorNavbar";

export default function DoctorPage() {
    const router = useRouter();
    const { all_doctors } = router.query;
    const { signedAccountId, wallet } = useContext(NearContext);
    const [doctorFullName , setDoctorFullName] = useState();
    const [doctorid , setdoctorid] = useState();
    const [spec , setspec] = useState()
    const [DoctorEmail , setDoctorEmail] = useState();
    const [DateOfBirth , setDateOfBirth] = useState();
    useEffect(() => {
        let doctors;
        if (all_doctors) {
            try {
                doctors = JSON.parse(all_doctors);
                console.log("Parsed Doctors:", doctors);
            } catch (error) {
                console.error("Error parsing doctors data:", error);
            }
        } else {
            console.warn("No doctors data available to parse.");
        }
    
        if (doctors && Array.isArray(doctors)) {
            for (let i = 0; i < doctors.length; i++) {
                if (doctors[i].sender === signedAccountId) {
                    var fullname = `${doctors[i].doctor_first_name} ${doctors[i].doctor_last_name}`;
                    console.log("doctor full name:", fullname);
                    setDoctorFullName(fullname);
                    setdoctorid(doctors[i].sender);
                    setspec(doctors[i].doctor_specialization);
                    setDoctorEmail(doctors[i].doctor_email);
                    setDateOfBirth(doctors[i].doctor_dob);
                }
            }
        }
    
        // Ensure all values are set before saving to localStorage
        if (doctorFullName && doctorid && spec && DoctorEmail && DateOfBirth) {
            localStorage.setItem("Docnm", doctorFullName);
            localStorage.setItem("sender", doctorid);
            localStorage.setItem("spec", spec);
            localStorage.setItem("DoctorEmail", DoctorEmail);
            localStorage.setItem("DateOfBirth", DateOfBirth);
        }
    }, [all_doctors, signedAccountId, doctorFullName, doctorid, spec, DoctorEmail, DateOfBirth]);
    
    

    async function DeleteDoc() {
        try {
            const result = await wallet.callMethod({
                contractId: GuestbookNearContract,
                method: "delete_all_doctors",
                args: {},
            });

            console.log("deletion result:", result);
        } catch (error) {
            console.error("Error deleting message:", error);
        }
    }

    return (
        <>
            <div id="DoctorsPageHead">
                <h1></h1>
                <div>
                    <div id="mainBox">
                        <div id="horzBar">
                            <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="108px" fill="#FFFFFF" className="proficon">
                                <path d="M480-512q-44.55 0-74.77-30.22Q375-572.45 375-617.5t30.23-74.78Q435.45-722 480-722t74.78 29.72Q585-662.55 585-617.5t-30.22 75.28Q524.55-512 480-512ZM212-232v-47q0-23 14-42t37-30q57-25 110.97-38t106-13Q532-402 586-389t110.48 38.4q23.69 10.71 37.6 29.65Q748-302 748-279v47H212Zm22-22h492v-25q0-15-10.5-29T686-332q-51-25-102.19-36.5Q532.63-380 480-380t-104.31 11.5Q324-357 274-332q-19 10-29.5 24T234-279v25Zm246-280q35 0 59-24t24-59q0-35-24-59t-59-24q-35 0-59 24t-24 59q0 35 24 59t59 24Zm0-83Zm0 363Z" />
                            </svg>
                            Name : <b>{doctorFullName}</b> <sub><b> Doctor </b></sub> <br /><br />
                        </div>
                        <div id="squareBox">
                            <div id="DoctorDetails">
                                Doctor id : <b>{doctorid}</b><br /><br />
                                specialization : <b>{spec}</b><br /><br />
                                Email : <b>{DoctorEmail}</b><br /><br />
                                DateOfBirth : <b>{DateOfBirth}</b>
                            </div>
                        </div>
                    </div>
                </div>
                <button onClick={DeleteDoc}>Delete All</button>
            </div>
            <DoctorNavbar />
        </>
    );
}
