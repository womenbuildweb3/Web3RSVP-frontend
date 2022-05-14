import Dashboard from "../../../components/Dashboard";
import EventCard from "../../../components/EventCard";

const navigation = [
  { name: "My Events", href: "/dashboard/my-events", current: false },
  { name: "My RSVPs", href: "/dashboard/my-rsvps", current: true },
];

const tabs = [
  { name: "Upcoming", href: "/dashboard/my-rsvps/upcoming", current: false },
  { name: "Past", href: "/dashboard/my-rsvps/past", current: true },
];

export default function MyPastRSVPs() {
  return (
    <Dashboard navigation={navigation} title={"My RSVPs"} tabs={tabs}>
      <ul
        role="list"
        className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
      >
        <li>
          <EventCard
            eid={1}
            title={"Wu-Tang Clan & Nas: NY State Of Mind Tour"}
          />
        </li>
      </ul>
    </Dashboard>
  );
}
