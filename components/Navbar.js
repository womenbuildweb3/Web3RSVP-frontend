import { Disclosure } from "@headlessui/react";
import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../components/wallet/connectors";
import { Web3Provider } from "@ethersproject/providers";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import Link from "next/link";
import Image from "next/image";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const { active, account, activate, deactivate } = useWeb3React();
  const [show, setShow] = useState(false);

  async function connect() {
    try {
      await activate(injected);
      setShow(true);
      localStorage.setItem("isWalletConnected", true);
      const btn = document.getElementById("btn");
      btn.style.display = "none";
      const btndisconnect = document.getElementById("btndisconnect");
      btndisconnect.style.display = "inline";
    } catch (ex) {
      console.log(ex);
    }
  }

  async function disconnect() {
    try {
      deactivate();
      localStorage.setItem("isWalletConnected", false);
    } catch (ex) {
      console.log(ex);
    }
  }

  useEffect(() => {
    // const connectWalletOnPageLoad = async () => {
    //   if (localStorage?.getItem("isWalletConnected") === "true") {
    //     try {
    //       localStorage.setItem("isWalletConnected", true);
    //     } catch (ex) {
    //       console.log(ex);
    //     }
    //   }
    // };
    // connectWalletOnPageLoad();
    console.log(account, active);
  }, []);

  return (
    <header className="bg-white border-b-2 border-gray-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="w-full py-6 flex flex-wrap items-center justify-between border-b border-indigo-500 lg:border-none">
          <div className="flex items-center">
            <Link href="/">
              <a>web3rsvp</a>
            </Link>
          </div>
          <div className="ml-10 space-x-4 flex items-center">
            <Link href="/create-event">
              <a className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Create Event
              </a>
            </Link>
            {active ? (
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="inline-flex items-center px-2.5 py-2 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 w-32 cursor-pointer">
                    <div className="w-12 h-3 mr-1 bg-indigo-400 rounded-full"></div>
                    <p className="text-ellipsis overflow-hidden">{account}</p>
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <Link href="/dashboard">
                            <a
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              Dashboard
                            </a>
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            onClick={disconnect}
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Log Out
                          </a>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            ) : (
              <button
                onClick={connect}
                id="btn"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </nav>
      {active ? (
        <Transition
          show={show}
          as={Fragment}
          enter="transform ease-out duration-300 transition"
          enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
          enterTo="translate-y-0 opacity-100 sm:-translate-x-2/4"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="absolute z-50 top-5 left-2/4 max-w-lg p-3 w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="indigo"
                  filter="brightness(1.3)"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-2">
                <p className="text-sm font-medium text-indigo-700">
                  Your wallet is now connected. Go create and join events!
                </p>
              </div>
              <div className="ml-auto pl-3">
                <div className="mx-3.5 -my-1.5">
                  <button
                    type="button"
                    className="inline-flex rounded-md p-1.5 text-indigo-700 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-50 focus:ring-indigo-600"
                  >
                    <span className="sr-only">Dismiss</span>
                    <XIcon
                      className="h-5 w-5"
                      aria-hidden="true"
                      onClick={() => {
                        setShow(!show);
                      }}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      ) : null}
    </header>
  );
}
