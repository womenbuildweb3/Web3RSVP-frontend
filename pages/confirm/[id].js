import { useState } from "react";
import Head from "next/head";
import { gql } from "@apollo/client";
import client from "../../apollo-client";
import { ethers } from "ethers";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import abiJSON from "../../utils/Web3RSVP.json";
import Alert from "../../components/Alert";

function Confirm({ event }) {
  const { data: account } = useAccount();

  const [success, setSuccess] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(null);
  const [currentTimestamp, setEventTimestamp] = useState(new Date().getTime());

  // const contractAddress = "0x54e8A3aFf5F52F9eD452156E850654c452BCBefE";
  const contractABI = abiJSON.abi;

  const confirmAllAttendees = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const rsvpContract = new ethers.Contract(
          process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
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
      <section className="relative">
        {loading && (
          <Alert
            alertType={"loading"}
            alertBody={"Please wait"}
            triggerAlert={true}
            color={"white"}
          />
        )}
        {success && (
          <Alert
            alertType={"success"}
            alertBody={message}
            triggerAlert={true}
            color={"palegreen"}
          />
        )}
        {success === false && (
          <Alert
            alertType={"failed"}
            alertBody={message}
            triggerAlert={true}
            color={"palevioletred"}
          />
        )}

        {!account && (
          <section className="flex flex-col items-start py-8">
            <p className="mb-4">Please connect your wallet to create events.</p>
            <ConnectButton />
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
