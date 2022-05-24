import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { useWeb3React } from "@web3-react/core";
import useConnectWallet from "../../hooks/useConnectWallet";
import Dashboard from "../../components/Dashboard";
import EventCard from "../../components/EventCard";
import ConnectBtn from "../../components/ConnectBtn";

const MY_UPCOMING_RSVPS = gql`
  query Account($id: String) {
    account(id: $id) {
      id
      rsvps {
        event {
          id
          name
          eventTimestamp
        }
      }
    }
  }
`;

export default function MyUpcomingRSVPs() {
  const { active, account } = useWeb3React();

  useConnectWallet();

  const id = active ? account.toLowerCase() : "";
  const [currentTimestamp, setEventTimestamp] = useState(new Date().getTime());
  const { loading, error, data } = useQuery(MY_UPCOMING_RSVPS, {
    variables: { id },
  });

  if (loading)
    return (
      <Dashboard page="rsvps" isUpcoming={true}>
        <p>Loading...</p>
      </Dashboard>
    );
  if (error)
    return (
      <Dashboard page="rsvps" isUpcoming={true}>
        <p>`Error! ${error.message}`</p>
      </Dashboard>
    );

  return (
    <Dashboard page="rsvps" isUpcoming={true}>
      {active ? (
        <ul
          role="list"
          className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
        >
          {data &&
            data.account &&
            data.account.rsvps.map(function (rsvp) {
              if (rsvp.event.eventTimestamp > currentTimestamp) {
                return (
                  <li key={rsvp.event.id}>
                    <EventCard
                      id={rsvp.event.id}
                      name={rsvp.event.name}
                      eventTimestamp={rsvp.event.eventTimestamp}
                    />
                  </li>
                );
              }
            })}
        </ul>
      ) : (
        <div className="flex flex-col items-center py-8">
          <p className="mb-4">Please connect your wallet to view your rsvps</p>
          <ConnectBtn />
        </div>
      )}
    </Dashboard>
  );
}
