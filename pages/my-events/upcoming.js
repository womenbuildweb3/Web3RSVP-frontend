import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import Dashboard from "../../components/Dashboard";
import EventCard from "../../components/EventCard";

const MY_UPCOMING_EVENTS = gql`
  query Events($eventOwner: String, $currentTimestamp: String) {
    events(
      where: { eventOwner: $eventOwner, eventTimestamp_gt: $currentTimestamp }
    ) {
      id
      eventID
      name
      description
      eventTimestamp
      maxCapacity
      totalRSVPs
      imageURL
    }
  }
`;

export default function MyUpcomingEvents() {
  const { data: account } = useAccount();

  const eventOwner = account ? account.address.toLowerCase() : "";
  const [currentTimestamp, setEventTimestamp] = useState(
    new Date().getTime().toString()
  );
  const { loading, error, data } = useQuery(MY_UPCOMING_EVENTS, {
    variables: { eventOwner, currentTimestamp },
  });

  if (loading)
    return (
      <Dashboard page="events" isUpcoming={true}>
        <p>Loading...</p>
      </Dashboard>
    );
  if (error)
    return (
      <Dashboard page="events" isUpcoming={true}>
        <p>`Error! ${error.message}`</p>
      </Dashboard>
    );
  // if (data) console.log(data);

  return (
    <Dashboard page="events" isUpcoming={true}>
      {account ? (
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
                  imageURL={event.imageURL}
                />
              </li>
            ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center py-8">
          <p className="mb-4">Please connect your wallet to view your events</p>
          <ConnectButton />
        </div>
      )}
    </Dashboard>
  );
}
