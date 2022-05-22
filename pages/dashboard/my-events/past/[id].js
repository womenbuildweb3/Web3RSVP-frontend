import Dashboard from "../../../../components/Dashboard";

const navigation = [
  { name: "My Events", href: "/dashboard/my-events", current: true },
  { name: "My RSVPs", href: "/dashboard/my-rsvps", current: false },
];

const tabs = [
  { name: "Upcoming", href: "/dashboard/my-events/upcoming", current: false },
  { name: "Past", href: "/dashboard/my-events/past", current: true },
];

const UpdateMyPastEvent = () => {
  return (
    <Dashboard navigation={navigation} title={"My Events"} tabs={tabs}>
      <p>coming soon</p>
    </Dashboard>
  );
};

export default UpdateMyPastEvent;
