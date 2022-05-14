import Dashboard from "../../../components/Dashboard";

const tabs = [
  { name: "Upcoming", href: "/dashboard/my-rsvps/upcoming", current: false },
  { name: "Past", href: "/dashboard/my-rsvps/past", current: true },
];

export default function MyUpcomingRSVPs() {
  return (
    <Dashboard title={"My RSVPs"} tabs={tabs}>
      <p>past</p>
    </Dashboard>
  );
}
