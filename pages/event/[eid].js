import { useRouter } from "next/router";

const Event = () => {
  const router = useRouter();
  const { pid } = router.query;

  return <p>Event: {pid}</p>;
};

export default Event;
