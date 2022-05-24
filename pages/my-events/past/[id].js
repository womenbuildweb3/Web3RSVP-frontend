import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { gql } from "@apollo/client";
import client from "../../../apollo-client";
import { ethers } from "ethers";
import { useWeb3React } from "@web3-react/core";
import useConnectWallet from "../../../hooks/useConnectWallet";
import abiJSON from "../../../utils/Web3RSVP.json";
import formatTimestamp from "../../../utils/formatTimestamp";
import DashboardNav from "../../../components/DashboardNav";
import Alert from "../../../components/Alert";
import ConnectBtn from "../../../components/ConnectBtn";

function PastEvent({ event }) {
  const { active } = useWeb3React();

  const [success, setSuccess] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(null);

  const contractAddress = "0x355cf64d7B0587656B49eB1f4890804De076e021";
  const contractABI = abiJSON.abi;

  useConnectWallet();

  const confirmAttendee = async (attendee) => {
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

        const txn = await rsvpContract.confirmAttendee(event.id, attendee);
        setLoading(true);
        console.log("Minting...", txn.hash);

        await txn.wait();
        console.log("Minted -- ", txn.hash);
        setSuccess(true);
        setLoading(false);
        setMessage("Attendance has been confirmed.");
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

  function checkIfConfirmed(event, address) {
    // console.log(event.confirmedAttendees);
    for (let i = 0; i < event.confirmedAttendees.length; i++) {
      let confirmedAddress = event.confirmedAttendees[i].attendee.id;
      if (confirmedAddress.toLowerCase() == address.toLowerCase()) {
        return true;
      }
    }
    return false;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Head>
        <title>My Dashboard | web3rsvp</title>
        <meta name="description" content="Manage your events and RSVPs" />
      </Head>
      <div className="flex flex-wrap py-8">
        <DashboardNav page={"events"} />
        <div className="sm:w-10/12 sm:pl-8">
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
            <section>
              <Link href="/my-events/past">
                <a className="text-indigo-800 text-sm hover:underline">
                  &#8592; Back
                </a>
              </Link>
              <h6 className="text-sm mt-4 mb-2">
                {formatTimestamp(event.eventTimestamp)}
              </h6>
              <h1 className="text-2xl tracking-tight font-extrabold text-gray-900 sm:text-3xl md:text-4xl mb-8">
                {event.name}
              </h1>
              <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                          >
                            Attendee
                          </th>
                          <th
                            scope="col"
                            className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                          >
                            <span className="sr-only">Edit</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {event.rsvps.map((rsvp) => (
                          <tr key={rsvp.attendee.id}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                              {rsvp.attendee.id}
                            </td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                              {checkIfConfirmed(event, rsvp.attendee.id) ? (
                                <p>Confirmed</p>
                              ) : (
                                <button
                                  type="button"
                                  className="text-indigo-600 hover:text-indigo-900"
                                  onClick={() =>
                                    confirmAttendee(rsvp.attendee.id)
                                  }
                                >
                                  Confirm attendee
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </section>
          ) : (
            <ConnectBtn />
          )}
        </div>
      </div>
    </div>
  );
}

export default PastEvent;

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
          eventTimestamp
          maxCapacity
          totalRSVPs
          totalConfirmedAttendees
          rsvps {
            id
            attendee {
              id
            }
          }
          confirmedAttendees {
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
