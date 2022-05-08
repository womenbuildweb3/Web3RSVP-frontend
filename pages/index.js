import { useEffect, useState } from "react";
import Head from "next/head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Layout from "../components/Layout";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const [preferedColorScheme, setPreferedColorScheme] = useState("light");

  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setPreferedColorScheme("dark");
    }
  }, []);

  return (
    <Layout>
      <Head>
        <title>web3rsvp</title>
        <meta
          name="description"
          content="Providing education, oppportunities, and funding to a new wave of web3 builders"
        />
        {preferedColorScheme === "light" && (
          <link rel="icon" href="/favicon.ico" />
        )}
      </Head>

      <Navbar preferedColorScheme={preferedColorScheme} />

      <div className="grid font-poppins-bold text-3xl sm:text-6xl leading-tight">
        <div>Discover what&apos;s happening in the metaverse</div>
      </div>
      <br />
      <p>Find, join and create virtual events with your web3 frens!</p>
      <br />
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        <li className="relative">
          <div>
            <input
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-full"
              placeholder="Search for all events"
            />
          </div>
        </li>
        <li className="relative">
          {" "}
          <select
            id="date"
            name="date"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-full"
          >
            <option selected>All Dates</option>
          </select>
        </li>
        <li className="relative">
          <input
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-full"
            placeholder="Search"
          />
        </li>
      </ul>

      <br />
      <div className="grid font-poppins-bold text-2xl sm:text-2xl leading-tight">
        <div>Hottest Events</div>
      </div>
      <br />
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        <li className="relative">
          <div className="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80"
              alt=""
              className="object-cover pointer-events-none group-hover:opacity-100"
            />
            <button
              type="button"
              className="absolute inset-0 focus:outline-none"
            >
              <span className="sr-only">View details for IMG_4985.HEIC</span>
            </button>
          </div>
          <p className="mt-2 block text-sm font-bold text-white-900 truncate pointer-events-none">
            TUE -OCT 4 -8:00PM
          </p>
          <p className="block text-sm font-bold text-white-500 pointer-events-none">
            Eth Denver
          </p>
        </li>
        <li className="relative">
          <div className="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80"
              alt=""
              className="object-cover pointer-events-none group-hover:opacity-100"
            />
            <button
              type="button"
              className="absolute inset-0 focus:outline-none"
            >
              <span className="sr-only">View details for IMG_4985.HEIC</span>
            </button>
          </div>
          <p className="mt-2 block text-sm font-medium text-white-900 truncate pointer-events-none">
            TUE -OCT 4 -8:00PM
          </p>
          <p className="block text-sm font-medium text-white-500 pointer-events-none">
            Eth Denver
          </p>
        </li>
        <li className="relative">
          <div className="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80"
              alt=""
              className="object-cover pointer-events-none group-hover:opacity-100"
            />
            <button
              type="button"
              className="absolute inset-0 focus:outline-none"
            >
              <span className="sr-only">View details for IMG_4985.HEIC</span>
            </button>
          </div>
          <p className="mt-2 block text-sm font-medium text-white-900 truncate pointer-events-none">
            TUE -OCT 4 -8:00PM
          </p>
          <p className="block text-sm font-medium text-white-00 pointer-events-none">
            Eth Denver
          </p>
        </li>
      </ul>
      <br />
      <div className="grid font-poppins-bold text-2xl sm:text-2xl leading-tight">
        <div>Just Added</div>
      </div>
      <br />
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        <li className="relative">
          <div className="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80"
              alt=""
              className="object-cover pointer-events-none group-hover:opacity-100"
            />
            <button
              type="button"
              className="absolute inset-0 focus:outline-none"
            >
              <span className="sr-only">View details for IMG_4985.HEIC</span>
            </button>
          </div>
          <p className="mt-2 block text-sm font-medium text-white-900 truncate pointer-events-none">
            TUE -OCT 4 -8:00PM
          </p>
          <p className="block text-sm font-medium text-white-500 pointer-events-none">
            Eth Spain
          </p>
        </li>
        <li className="relative">
          <div className="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80"
              alt=""
              className="object-cover pointer-events-none group-hover:opacity-100"
            />
            <button
              type="button"
              className="absolute inset-0 focus:outline-none"
            >
              <span className="sr-only">View details for IMG_4985.HEIC</span>
            </button>
          </div>
          <p className="mt-2 block text-sm font-medium text-white-900 truncate pointer-events-none">
            TUE -OCT 4 -8:00PM
          </p>
          <p className="block text-sm font-medium text-white-500 pointer-events-none">
            Eth Denver
          </p>
        </li>
        <li className="relative">
          <div className="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80"
              alt=""
              className="object-cover pointer-events-none group-hover:opacity-100"
            />
            <button
              type="button"
              className="absolute inset-0 focus:outline-none"
            >
              <span className="sr-only">View details for IMG_4985.HEIC</span>
            </button>
          </div>
          <p className="mt-2 block text-sm font-medium text-white-900 truncate pointer-events-none">
            TUE -OCT 4 -8:00PM
          </p>
          <p className="block text-sm font-medium text-white-500 pointer-events-none">
            Eth Spain
          </p>
        </li>
      </ul>

      <section className="max-w-5xl mb-44 flex flex-col-reverse sm:flex-row m-auto gap-8"></section>

      <section className="mb-44"></section>

      <Footer preferedColorScheme={preferedColorScheme} />
    </Layout>
  );
}
