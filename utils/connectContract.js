import abiJSON from "../utils/Web3RSVP.json";
import { ethers } from "ethers";

function connectContract() {
    const contractAddress = "0xf63E81e85D3abDc163abD7283364870dC55b6Ce3";
    const contractABI = abiJSON.abi;
    let rsvpContract;
    try {
        const { ethereum } = window;
  
        if (ethereum) {
          //checking for eth object in the window, see if they have wallet connected
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          console.log("contractABI", contractABI);
          rsvpContract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          ); // instantiating new connection to the contract
          console.log("rsvpContract", rsvpContract);
        } else {
          console.log("Ethereum object doesn't exist!");
        }
      } catch (error) {
        console.log("ERROR:", error);
      }
      return rsvpContract;
  }
  
  export default connectContract;
  