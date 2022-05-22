import { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../components/wallet/connectors";

function useConnectWallet() {
  const { activate } = useWeb3React();

  useEffect(() => {
    const connectWalletOnPageLoad = async () => {
      if (localStorage?.getItem("isWalletConnected") === "true") {
        try {
          await activate(injected);
          localStorage.setItem("isWalletConnected", true);
        } catch (err) {
          console.log(err);
        }
      }
    };
    connectWalletOnPageLoad();
  }, [activate]);
}

export default useConnectWallet;
