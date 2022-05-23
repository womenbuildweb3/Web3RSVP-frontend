import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import HomepageLayout from "../components/HomepageLayout";
import EventCard from "../components/EventCard";

const UPCOMING_EVENTS = gql`
  query Events($eventTimestamp: String) {
    events(where: { eventTimestamp_gt: $eventTimestamp }) {
      id
      name
      eventTimestamp
    }
  }
`;

export default function Home() {
  const [eventTimestamp, setEventTimestamp] = useState(
    new Date().getTime().toString()
  );
  const { loading, error, data } = useQuery(UPCOMING_EVENTS, {
    variables: { eventTimestamp },
  });

  if (loading)
    return (
      <HomepageLayout>
        <p>Loading...</p>
      </HomepageLayout>
    );
  if (error)
    return (
      <HomepageLayout>
        <p>`Error! ${error.message}`</p>
      </HomepageLayout>
    );

  return (
    <HomepageLayout>
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
    </HomepageLayout>
  );
}
