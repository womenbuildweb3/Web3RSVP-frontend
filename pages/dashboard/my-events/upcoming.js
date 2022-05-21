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

export default function MyUpcomingEvents() {
  return (
    <Dashboard navigation={navigation} title={"My Events"} tabs={tabs}>
      <ul
        role="list"
        className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
      >
        <li>
          {/* <EventCard
            id={1}
            title={"Wu-Tang Clan & Nas: NY State Of Mind Tour"}
          /> */}
        </li>
      </ul>
    </Dashboard>
  );
}
