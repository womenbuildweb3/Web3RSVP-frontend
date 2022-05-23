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

function Event({ event }) {
  const { active, account } = useWeb3React();
  const [success, setSuccess] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(null);

  console.log("THIS EVENT:", event);
  const contractAddress = "0x355cf64d7B0587656B49eB1f4890804De076e021";
  const contractABI = abiJSON.abi;

  useConnectWallet();

  function checkIfAlreadyRSVPed() {
    if (active) {
      console.log("active");
      for (let i = 0; i < event.rsvps.length; i++) {
        console.log(event.rsvps[i].attendee.id);
        console.log("ACCOUNT:", account.toLowerCase());
        const thisAccount = account.toLowerCase();
        if (event.rsvps[i].attendee.id == thisAccount) {
          return true;
        }
      }
    }
    return false;
  }

  const newRSVP = async () => {
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

        const txn = await rsvpContract.createNewRSVP(event.id, {
          value: event.deposit,
          gasLimit: 300000,
        });
        setLoading(true);
        console.log("Mining...", txn.hash);

        await txn.wait();
        console.log("Mined -- ", txn.hash);
        setSuccess(true);
        setLoading(false);
        setMessage("Your RSVP has been created successfully.");
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      setSuccess(false);
      setMessage(`Error: https://goerli.etherscan.io/tx/${txn.hash}`);
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
      <section className="py-12">
        <h6 className="mb-2">{formatTimestamp(event.eventTimestamp)}</h6>
        <h1 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl md:text-5xl mb-6 lg:mb-12">
          {event.name}
        </h1>
        <div className="flex flex-wrap-reverse lg:flex-nowrap">
          <div className="w-full pr-0 lg:pr-24 xl:pr-32">
            <div className="mb-8 w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80"
                alt="event image"
                layout="fill"
                objectFit="cover"
              ></Image>
            </div>
            <p>{event.description}</p>
          </div>
          <div className="max-w-xs w-full flex flex-col gap-4 mb-6 lg:mb-0">
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
            {active ? (
              checkIfAlreadyRSVPed() ? (
                <>
                  <span className="w-full text-center px-6 py-3 text-base font-medium rounded-full text-indigo-700 border-2 border-indigo-100">
                    You have RSVPed!
                  </span>
                  <div className="flex item-center">
                    <LinkIcon className="w-6 mr-2" />
                    <a
                      className="text-indigo-800 truncate hover:underline"
                      href={event.link}
                    >
                      {event.link}
                    </a>
                  </div>
                </>
              ) : (
                <button
                  type="button"
                  className="w-full items-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={newRSVP}
                >
                  RSVP for {ethers.utils.formatEther(event.deposit)} ETH
                </button>
              )
            ) : (
              <ConnectBtn />
            )}
            <div className="flex item-center">
              <UsersIcon className="w-6 mr-2" />
              <span className="truncate">
                {event.totalRSVPs}/{event.maxCapacity} attending
              </span>
            </div>
            <div className="flex item-center">
              <TicketIcon className="w-6 mr-2" />
              <span className="truncate">1 RSVP per wallet</span>
            </div>
            <div className="flex items-center">
              <EmojiHappyIcon className="w-10 mr-2" />
              <span className="truncate">Hosted by {event.eventOwner}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Event;

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
