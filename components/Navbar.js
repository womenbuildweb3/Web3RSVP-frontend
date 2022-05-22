import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { useWeb3React } from "@web3-react/core";
import useConnectWallet from "../hooks/useConnectWallet";
import ConnectBtn from "./ConnectBtn";
import joinClassNames from "../utils/joinClassNames";

export default function Navbar() {
  const { active, account, deactivate } = useWeb3React();

  async function disconnect() {
    try {
      deactivate();
      localStorage.setItem("isWalletConnected", false);
    } catch (err) {
      console.log(err);
    }
  }

  useConnectWallet();

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
                          <a
                            href={`/my-events/${account}/upcoming`}
                            className={joinClassNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Dashboard
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            onClick={disconnect}
                            className={joinClassNames(
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
              <ConnectBtn />
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
