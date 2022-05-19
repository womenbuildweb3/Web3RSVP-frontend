import { useEffect, useState } from "react";
import Head from "next/head";
import Layout from "../components/Layout";
import Link from "next/link";
import Image from "next/image";
import EventCard from "../components/EventCard";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const APIURL =
  "https://api.thegraph.com/subgraphs/name/sarahschwartz/web3-rsvp";

const eventsQuery = `
  query ($first: Int) {
    events(first: $first) {
      id
      name
      description
      eventTimestamp
      totalConfirmedAttendees
      link
      totalRSVPs
    }
  }
`;

const client = new ApolloClient({
  uri: APIURL,
  cache: new InMemoryCache(),
});

client
  .query({
    query: gql(eventsQuery),
    variables: {
      first: 5,
      orderBy: "createdAtTimestamp",
      orderDirection: "desc",
    },
  })
  .then((data) => console.log("Subgraph data: ", data))
  .catch((err) => {
    console.log("Error fetching data: ", err);
  });

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query Events {
        events {
          id
          eventID
          name
          description
          eventTimestamp
          totalConfirmedAttendees
          link
          totalRSVPs
        }
      }
    `,
  });

  return {
    props: {
      events: data.events.slice(2, 6), // first two events name are null
    },
  };
}

export default function Home({ events }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Head>
        <title>web3rsvp</title>
        <meta
          name="description"
          content="Find, join, and create virtual events with your web3 frens"
        />
      </Head>
      <section className="py-12">
        <div className="w-full md:w-8/12 text-left">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span>Discover what&apos;s happening in the </span>
            <span className="text-indigo-600">metaverse</span>
          </h1>
          <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
            Find, join, and create virtual events with your web3 frens!
          </p>
        </div>
        <form action="#" method="POST" className="mt-8 sm:flex">
          <label htmlFor="email" className="sr-only">
            Events
          </label>
          <input
            type="text"
            name="event"
            id="event"
            className="block w-full p-3 text-base rounded-full placeholder-gray-500 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:flex-1 border border-gray-300"
            placeholder="Search for events"
          ></input>
          <button
            type="submit"
            className="mt-3 w-full px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-gray-800 shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:flex-shrink-0 sm:inline-flex sm:items-center sm:w-auto"
          >
            Search
          </button>
        </form>
      </section>
      <section className="py-12">
        <h2 className="text-2xl tracking-tight font-extrabold text-gray-900 sm:text-3xl md:text-4xl mb-8">
          Happening Soon
        </h2>
        <ul
          role="list"
          className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
        >
          {events.map((event) => (
            <li key="{event.id}">
              <EventCard
                eid={event.id}
                title={event.name}
                eventTimestamp={event.eventTimestamp}
              />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
