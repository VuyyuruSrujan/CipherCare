import { useState } from 'react';
import { useRouter } from 'next/router';

export default function PatientNavbar() {
    const [menuOpen, setMenuOpen] = useState(true);
    const router = useRouter();

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <>
            <div>
                <div>
                    <img src="menu.png" id="menuimg" onClick={toggleMenu} alt="Menu Icon" />
                    <ul className={`menu ${menuOpen ? 'slide-in' : 'slide-out'}`}>
                        <li><button>PROFILE</button></li>
                        <li><button>PRESCRIPTIONS / RECORDS</button></li>
                        <li><button> REQUEST LOGS </button></li>
                        <li><button> DOCTOR APPOINTMENT</button></li>
                    </ul>
                </div>
            </div>
        </>
    );
}
