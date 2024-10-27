import { utils } from "near-api-js";
import { useState, useEffect, useContext } from "react";
import { useRouter } from 'next/router';

import Landing from "../components/Landing";
import Form from "../components/Form";
import SignIn from "../components/SignIn";
import styles from "../styles/app.module.css";

import { NearContext } from "../context";
import { GuestbookNearContract } from "../config";

export default function Home() {
  const { signedAccountId, wallet } = useContext(NearContext);
  const [messages, setMessages] = useState([]);
  const router = useRouter(); // To access the URL query params

  useEffect(() => {
    getLast10Messages().then((messages) => setMessages(messages));
  }, []);


  const getLast10Messages = async () => {
    const total_messages = await wallet.viewMethod({
      contractId: GuestbookNearContract,
      method: "total_messages",
    });
    const from_index = total_messages >= 10 ? total_messages - 10 : 0;
    return wallet.viewMethod({
      contractId: GuestbookNearContract,
      method: "get_messages",
      args: { from_index: String(from_index), limit: "10" },
    });
  };

  return (
    <main className={styles.main}>
      <div className="container">
        <h1></h1>
        {/* {signedAccountId ? ( */}
          <Landing currentAccountId={signedAccountId} />
        {/* ) : (
          <SignIn messages={messages} />
        )} */}
      </div>
    </main>
  );
}
