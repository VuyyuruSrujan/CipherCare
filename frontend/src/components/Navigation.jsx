import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useContext } from "react";
import { useRouter } from 'next/router';
import { NearContext } from "../context";
import NearLogo from "/public/near-logo.svg";

export const Navigation = () => {
  const { signedAccountId, wallet } = useContext(NearContext);
  const [action, setAction] = useState(() => {});
  const [label, setLabel] = useState("Loading...");
  const router = useRouter();

  useEffect(() => {
    if (!wallet) return;

    if (signedAccountId) {
      setAction(() => () => {
        wallet.signOut();
        router.replace('/'); // Redirect to main page after logout
      });
      setLabel(`Logout`);
    } else {
      setAction(() => wallet.signIn);
      setLabel("Login");
    }
  }, [signedAccountId, wallet, router]);

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <Link href="/" passHref legacyBehavior>
          <Image
            priority
            src={NearLogo}
            alt="NEAR"
            width="30"
            height="24"
            className="d-inline-block align-text-top"
          />
        </Link>
        <div className="navbar-nav pt-1">
          <button className="btn btn-secondary" onClick={action}>
            {label}
          </button>
        </div>
      </div>
    </nav>
  );
};
