import { gql } from "@apollo/client";
import client from "../../../apollo-client";
import Dashboard from "../../../components/Dashboard";
import EventCard from "../../../components/EventCard";

export default function MyPastEvents({ events }) {
  return (
    <Dashboard page="events" isUpcoming={false}>
      <ul
        role="list"
        className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
      >
        {events.map((event) => (
          <li key={event.id}>
            <EventCard
              id={event.id}
              name={event.name}
              eventTimestamp={event.eventTimestamp}
            />
          </li>
        ))}
      </ul>
    </Dashboard>
  );
}

export async function getServerSideProps(context) {
  const { address } = context.params;
  const currentTime = new Date().getTime().toString();

  const { data } = await client.query({
    query: gql`
      query Events($eventOwner: String, $eventTimestamp: String) {
        events(
          where: { eventOwner: $eventOwner, eventTimestamp_lt: $eventTimestamp }
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
    `,
    variables: {
      eventOwner: address,
      eventTimestamp: currentTime,
    },
  });

  return {
    props: {
      events: data.events,
    },
  };
}
