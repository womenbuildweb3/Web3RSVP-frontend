import { Fragment, useState } from "react";
import Head from "next/head";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { CalendarIcon, XIcon } from "@heroicons/react/outline";
import EventCard from "../components/EventCard";
import { SearchIcon } from "@heroicons/react/solid";

const navigation = [
  { name: "My Events", href: "#", icon: CalendarIcon, current: true },
  { name: "My RSVPs", href: "#", icon: CalendarIcon, current: false },
];

const tabs = [
  { name: "Upcoming", href: "#", current: true },
  { name: "Past", href: "#", current: false },
];
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {}
      <div>
        <nav className="space-y-1" aria-label="Sidebar">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={classNames(
                item.current
                  ? "bg-gray-200 text-gray-900"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                "flex items-center px-3 py-2 text-sm font-medium rounded-md"
              )}
              aria-current={item.current ? "page" : undefined}
            >
              <item.icon
                className={classNames(
                  item.current ? "text-gray-500" : "text-gray-400",
                  "flex-shrink-0 -ml-1 mr-3 h-6 w-6"
                )}
                aria-hidden="true"
              />
              <span className="truncate">{item.name}</span>
              {item.count ? (
                <span
                  className={classNames(
                    item.current ? "bg-gray-50" : "bg-gray-200 text-gray-600",
                    "ml-auto inline-block py-0.5 px-3 text-xs rounded-full"
                  )}
                >
                  {item.count}
                </span>
              ) : null}
            </a>
          ))}
        </nav>
        <div className="md:pl-64 flex flex-col flex-1">
          <main className="flex-1">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <h1 className="text-2xl font-semibold text-gray-900 flex">
                  Events I Created
                </h1>
              </div>
              <div className="flex justify-center items-center">
                <div className="sm:hidden">
                  <label htmlFor="tabs" className="sr-only">
                    Select a tab
                  </label>
                  {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
                  <select
                    id="tabs"
                    name="tabs"
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    defaultValue={tabs.find((tab) => tab.current).name}
                  >
                    {tabs.map((tab) => (
                      <option key={tab.name}>{tab.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="hidden sm:block">
                <div>
                  <nav
                    className="-mb-px flex space-x-8 flex justify-center items-center"
                    aria-label="Tabs"
                  >
                    {tabs.map((tab) => (
                      <a
                        key={tab.name}
                        href={tab.href}
                        className={classNames(
                          tab.current
                            ? "border-indigo-500 text-indigo-600"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                          "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-2xl"
                        )}
                        aria-current={tab.current ? "page" : undefined}
                      >
                        {tab.name}
                      </a>
                    ))}
                  </nav>
                </div>
              </div>

              <div className="max-w-xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                <ul
                  role="list"
                  className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
                >
                  <li>
                    <EventCard
                      eid={1}
                      title={"Wu-Tang Clan & Nas: NY State Of Mind Tour"}
                    />
                  </li>
                </ul>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
