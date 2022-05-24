import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { gql } from "@apollo/client";
import client from "../../apollo-client";
import { ethers } from "ethers";
import { useWeb3React } from "@web3-react/core";
import useConnectWallet from "../../hooks/useConnectWallet";
import abiJSON from "../../utils/Web3RSVP.json";
import formatTimestamp from "../../utils/formatTimestamp";
import ConnectBtn from "../../components/ConnectBtn";
import Alert from "../../components/Alert";
import {
  EmojiHappyIcon,
  TicketIcon,
  UsersIcon,
  LinkIcon,
} from "@heroicons/react/outline";

function Confirm({ event }) {
  const { active, account } = useWeb3React();
  const [success, setSuccess] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(null);
  const [currentTimestamp, setEventTimestamp] = useState(new Date().getTime());

  const contractAddress = "0xa836B4BD7863136C3153dB3B3c8Da741b5E4A591";
  const contractABI = abiJSON.abi;

  console.log("ACCOUNT:", account)
  console.log("EVENT OWNER:", event.eventOwner)

  useConnectWallet();

  const confirmAllAttendees = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const rsvpContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        const txn = await rsvpContract.confirmAllAttendees(event.id, {
          gasLimit: 300000,
        });
        setLoading(true);
        console.log("Mining...", txn.hash);

        await txn.wait();
        console.log("Mined -- ", txn.hash);
        setSuccess(true);
        setLoading(false);
        setMessage("All attendees confirmed successfully.");
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      setSuccess(false);
      // setMessage(
      //   `Error: ${process.env.NEXT_PUBLIC_TESTNET_EXPLORER_URL}tx/${txn.hash}`
      // );
      setMessage("Error!");
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Head>
        <title>{event.name} | web3rsvp</title>
        <meta name="description" content={event.name} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section>
        {loading && (
          <Alert
            alertType={"loading"}
            alertBody={"Please wait"}
            triggerAlert={true}
          />
        )}
        {success && (
          <Alert
            alertType={"success"}
            alertBody={message}
            triggerAlert={true}
            color={"green"}
          />
        )}
        {success === false && (
          <Alert
            alertType={"failed"}
            alertBody={message}
            triggerAlert={true}
            color={"red"}
          />
        )}

        {!active && (
          <section className="flex flex-col items-start py-8">
            <p className="mb-4">Please connect your wallet to create events.</p>
            <ConnectBtn />
          </section>
        )}

        <button
          type="button"
          className="w-full items-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={confirmAllAttendees}
        >
          Confirm All
        </button>
      </section>
    </div>
  );
}

export default Confirm;

export async function getServerSideProps(context) {
  const { id } = context.params;
  console.log(id);

  const { data } = await client.query({
    query: gql`
      query Event($id: String!) {
        event(id: $id) {
          id
          eventID
          name
          description
          link
          eventOwner
          eventTimestamp
          maxCapacity
          deposit
          totalRSVPs
          totalConfirmedAttendees
          rsvps {
            id
            attendee {
              id
            }
          }
        }
      }
    `,
    variables: {
      id: id,
    },
  });

  return {
    props: {
      event: data.event,
    },
  };
}
