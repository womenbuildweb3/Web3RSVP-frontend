import Dashboard from "../../../components/Dashboard";

const tabs = [
  { name: "Upcoming", href: "/dashboard/my-events/upcoming", current: true },
  { name: "Past", href: "/dashboard/my-events/past", current: false },
];

export default function MyUpcomingEvents() {
  return (
    <Dashboard title={"My Events"} tabs={tabs}>
      <p>upcoming</p>
    </Dashboard>
  );
}
