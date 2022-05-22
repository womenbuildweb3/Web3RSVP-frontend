import { gql } from "@apollo/client";
import client from "../../../apollo-client";
import { useWeb3React } from "@web3-react/core";
import Dashboard from "../../../components/Dashboard";
import EventCard from "../../../components/EventCard";

const navigation = [
  { name: "My Events", href: "/dashboard/my-events", current: true },
  { name: "My RSVPs", href: "/dashboard/my-rsvps", current: false },
];

const tabs = [
  { name: "Upcoming", href: "/dashboard/my-events/upcoming", current: true },
  { name: "Past", href: "/dashboard/my-events/past", current: false },
];

export default function MyUpcomingEvents({ events }) {
  return (
    <Dashboard navigation={navigation} title={"My Events"} tabs={tabs}>
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

export async function getStaticProps() {
  const { active, account } = useWeb3React();

  const { data } = await client.query({
    query: gql`
      query Events($eventOwner: String!) {
        events(where: { eventOwner_contains: $eventOwner }) {
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
      eventOwner: account,
    },
  });

  return {
    props: {
      event: data.event,
    },
  };
}
