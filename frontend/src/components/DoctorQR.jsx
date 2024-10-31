import { useEffect, useState } from "react";

export default function DoctorQR() {
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        if (dataLoaded) {
            var doctornm = localStorage.getItem("Docnm");
            var sender = localStorage.getItem("sender");
            var spec = localStorage.getItem("spec");
            var email = localStorage.getItem("DoctorEmail");
            var dob = localStorage.getItem("DateOfBirth");
            console.log("doctornm,sender,spec,email,dob", doctornm, sender, spec, email, dob);
        }
    }, [dataLoaded]);

    useEffect(() => {
        setTimeout(() => setDataLoaded(true), 500);
    }, []);

    return (
        <div>
                
        </div>
    );
}
