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

      <header className="mt-24 min-w-[300px] sm:mt-8 mb-44 grid gap-4 sm:gap-8">
        <div className="grid font-poppins-bold text-3xl sm:text-6xl leading-tight">
          <div>Discover what's happening in the metaverse</div>
        </div>
      </header>

      <section className="mb-44 grid sm:grid-cols-2 gap-8"></section>

      <section className="max-w-5xl mb-44 flex flex-col-reverse sm:flex-row m-auto gap-8"></section>

      <section className="mb-44"></section>

      <Footer preferedColorScheme={preferedColorScheme} />
    </Layout>
  );
}
