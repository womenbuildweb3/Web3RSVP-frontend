import Dashboard from "../../../components/Dashboard";

const tabs = [
  { name: "Upcoming", href: "/dashboard/my-rsvps/upcoming", current: true },
  { name: "Past", href: "/dashboard/my-rsvps/past", current: false },
];

export default function MyUpcomingRSVPs() {
  return (
    <Dashboard title={"My RSVPs"} tabs={tabs}>
      <p>upcoming</p>
    </Dashboard>
  );
}
