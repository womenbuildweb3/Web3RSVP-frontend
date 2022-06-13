import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import Dashboard from "../../components/Dashboard";
import EventCard from "../../components/EventCard";


export default function MyUpcomingRSVPs() {

  return (
    <Dashboard page="rsvps" isUpcoming={true}>
      
    </Dashboard>
  );
}
