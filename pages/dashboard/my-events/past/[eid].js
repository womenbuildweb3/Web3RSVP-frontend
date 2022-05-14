import Dashboard from "../../../../components/Dashboard";

const tabs = [
  { name: "Upcoming", href: "/dashboard/my-events/upcoming", current: false },
  { name: "Past", href: "/dashboard/my-events/past", current: true },
];

export default function UpdateMyPastEvent() {
  return (
    <Dashboard title={"My Events"} tabs={tabs}>
      <p>past events</p>
    </Dashboard>
  );
}
