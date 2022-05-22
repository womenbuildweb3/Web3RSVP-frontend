import { useWeb3React } from "@web3-react/core";
import { injected } from "../components/wallet/connectors";

export default function ConnectBtn() {
  const { activate } = useWeb3React();

  async function connect() {
    try {
      await activate(injected);
      localStorage.setItem("isWalletConnected", true);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <button
      id="connect-wallet"
      onClick={connect}
      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      Connect Wallet
    </button>
  );
}
