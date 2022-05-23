import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { useWeb3React } from "@web3-react/core";
import useConnectWallet from "../../hooks/useConnectWallet";
import Dashboard from "../../components/Dashboard";
import EventCard from "../../components/EventCard";
import ConnectBtn from "../../components/ConnectBtn";

const MY_PAST_EVENTS = gql`
  query Events($eventOwner: String, $currentTimestamp: String) {
    events(
      where: { eventOwner: $eventOwner, eventTimestamp_lt: $currentTimestamp }
    ) {
      id
      eventID
      name
      description
      eventTimestamp
      maxCapacity
      totalRSVPs
    }
  }
`;

export default function MyPastEvents() {
  const { active, account } = useWeb3React();

  useConnectWallet();

  const eventOwner = active ? account.toLowerCase() : "";
  const [currentTimestamp, setEventTimestamp] = useState(
    new Date().getTime().toString()
  );
  const { loading, error, data } = useQuery(MY_PAST_EVENTS, {
    variables: { eventOwner, currentTimestamp },
  });

  if (loading)
    return (
      <Dashboard page="events" isUpcoming={false}>
        <p>Loading...</p>
      </Dashboard>
    );
  if (error)
    return (
      <Dashboard page="events" isUpcoming={false}>
        <p>`Error! ${error.message}`</p>
      </Dashboard>
    );

  return (
    <Dashboard page="events" isUpcoming={false}>
      {active ? (
        <ul
          role="list"
          className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
        >
          {data &&
            data.events.map((event) => (
              <li key={event.id}>
                <EventCard
                  id={event.id}
                  name={event.name}
                  eventTimestamp={event.eventTimestamp}
                />
              </li>
            ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center py-8">
          <p className="mb-4">
            {`Please connect your wallet to view your ${page}`}.
          </p>
          <ConnectBtn />
        </div>
      )}
    </Dashboard>
  );
}
