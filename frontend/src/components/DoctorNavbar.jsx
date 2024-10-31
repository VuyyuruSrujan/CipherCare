import { useState } from 'react';
import { useRouter } from 'next/router';

export default function DoctorNavbar() {
    const [menuOpen, setMenuOpen] = useState(true);
    const router = useRouter();

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
    function ConnectToPatient(){
        router.push('/ConnToP');
    }
    function ProfilePage(){
        router.push('/Doctorp')
    }

    return (
        <>
            <div>
                <div>
                    <img src="menu.png" id="menuimg" onClick={toggleMenu} alt="Menu Icon" />
                    <ul className={`menu ${menuOpen ? 'slide-in' : 'slide-out'}`}>
                        <li><button onClick={ProfilePage}>PROFILE</button></li>
                        <li><button> PATIENTS DEALED </button></li>
                        <li><button> PATIENT REQUESTS </button></li>
                        <li><button onClick={ConnectToPatient}> CONNECT TO PATIENT </button></li>
                    </ul>
                </div>
            </div>
        </>
    );
}
