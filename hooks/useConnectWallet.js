import { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../components/wallet/connectors";

function useConnectWallet() {
  const { activate, chainId } = useWeb3React();

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
      if (chainId != null && chainId != 80001) {
        console.log("switch pls");
      }
    };
    connectWalletOnPageLoad();
  }, [activate, chainId]);
}

export default useConnectWallet;
