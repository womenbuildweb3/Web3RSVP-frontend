import { useRouter } from "next/router";
import Head from "next/head";

const Event = () => {
  const router = useRouter();
  const { eid } = router.query;
  const eventDetails = {
    eid: 1,
    title: "Wu-Tang Clan & Nas: NY State Of Mind Tour",
    imageURL:
      "https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80",
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <Head>
        <title>{eventDetails.title} | web3rsvp</title>
        <meta name="description" content={eventDetails.title} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="py-12">
        <h1 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl md:text-5xl">
          {eventDetails.title}
        </h1>
      </section>
    </div>
  );
};

export default Event;
