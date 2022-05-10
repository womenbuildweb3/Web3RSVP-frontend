import { Fragment, useState } from "react";
import Head from "next/head";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  CalendarIcon,
  CogIcon,
  HomeIcon,
  MapIcon,
  MenuIcon,
  SearchCircleIcon,
  SpeakerphoneIcon,
  UserGroupIcon,
  ViewGridAddIcon,
  XIcon,
} from "@heroicons/react/outline";
import EventCard from "../components/EventCard";
import { SearchIcon } from "@heroicons/react/solid";

const navigation = [
  { name: "My Events", href: "#", icon: CalendarIcon, current: true },
  { name: "My RSVPs", href: "#", icon: CalendarIcon, current: false },
];
const secondaryNavigation = [
  { name: "Apps", href: "#", icon: ViewGridAddIcon },
  { name: "Settings", href: "#", icon: CogIcon },
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
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-white">
        <body class="h-full overflow-hidden">
        ```
      */}
      <div className="h-full flex">
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 flex z-40">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex-1 flex flex-col max-w-xs w-full bg-white focus:outline-none">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                      <button
                        type="button"
                        className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                    <div className="flex-shrink-0 flex items-center px-4">
                      <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/workflow-logo-pink-500-mark-gray-900-text.svg"
                        alt="Workflow"
                      />
                    </div>
                    <nav aria-label="Sidebar" className="mt-5">
                      <div className="px-2 space-y-1">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                              "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            <item.icon
                              className={classNames(
                                item.current
                                  ? "text-gray-500"
                                  : "text-gray-400 group-hover:text-gray-500",
                                "mr-4 h-6 w-6"
                              )}
                              aria-hidden="true"
                            />
                            {item.name}
                          </a>
                        ))}
                      </div>
                      <hr
                        className="border-t border-gray-200 my-5"
                        aria-hidden="true"
                      />
                      <div className="px-2 space-y-1">
                        {secondaryNavigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-base font-medium rounded-md"
                          >
                            <item.icon
                              className="text-gray-400 group-hover:text-gray-500 mr-4 flex-shrink-0 h-6 w-6"
                              aria-hidden="true"
                            />
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </nav>
                  </div>
                  <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                    <a href="#" className="flex-shrink-0 group block">
                      <div className="flex items-center">
                        <div></div>
                        <div className="ml-3">
                          <p className="text-base font-medium text-gray-700 group-hover:text-gray-900"></p>
                          <p className="text-sm font-medium text-gray-500 group-hover:text-gray-700">
                            View profile
                          </p>
                        </div>
                      </div>
                    </a>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <div className="flex-shrink-0 w-14" aria-hidden="true">
                {/* Force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:flex lg:flex-shrink-0">
          <div className="flex flex-col w-64">
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className="flex-1 flex flex-col min-h-0 border-gray-200">
              <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                <div className="flex items-center flex-shrink-0 px-4"></div>
                <nav className="mt-5 flex-1" aria-label="Sidebar">
                  <div className="px-2 space-y-1">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-200 text-gray-900"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                          "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        <item.icon
                          className={classNames(
                            item.current
                              ? "text-gray-500"
                              : "text-gray-400 group-hover:text-gray-500",
                            "mr-3 flex-shrink-0 h-6 w-6"
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </a>
                    ))}
                  </div>
                  <hr
                    className="border-t border-gray-200 my-5"
                    aria-hidden="true"
                  />
                </nav>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <main className="flex-1">
            <div className="py-6">
              <div className="">
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
                    className="-mb-px flex space-x-72 flex justify-center items-center"
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

  //   return (
  //     <>
  //       {}
  //       <div>
  //         <nav className="space-y-1" aria-label="Sidebar">
  //           {navigation.map((item) => (
  //             <a
  //               key={item.name}
  //               href={item.href}
  //               className={classNames(
  //                 item.current
  //                   ? "bg-gray-200 text-gray-900"
  //                   : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
  //                 "flex items-center px-3 py-2 text-sm font-medium rounded-md"
  //               )}
  //               aria-current={item.current ? "page" : undefined}
  //             >
  //               <item.icon
  //                 className={classNames(
  //                   item.current ? "text-gray-500" : "text-gray-400",
  //                   "flex-shrink-0 -ml-1 mr-3 h-6 w-6"
  //                 )}
  //                 aria-hidden="true"
  //               />
  //               <span className="truncate">{item.name}</span>
  //               {item.count ? (
  //                 <span
  //                   className={classNames(
  //                     item.current ? "bg-gray-50" : "bg-gray-200 text-gray-600",
  //                     "ml-auto inline-block py-0.5 px-3 text-xs rounded-full"
  //                   )}
  //                 >
  //                   {item.count}
  //                 </span>
  //               ) : null}
  //             </a>
  //           ))}
  //         </nav>
  //   <div className="md:pl-64 flex flex-col flex-1">
  //     <main className="flex-1">
  //       <div className="py-6">
  //         <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
  //           <h1 className="text-2xl font-semibold text-gray-900 flex">
  //             Events I Created
  //           </h1>
  //         </div>
  //         <div className="flex justify-center items-center">
  //           <div className="sm:hidden">
  //             <label htmlFor="tabs" className="sr-only">
  //               Select a tab
  //             </label>
  //             {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
  //             <select
  //               id="tabs"
  //               name="tabs"
  //               className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
  //               defaultValue={tabs.find((tab) => tab.current).name}
  //             >
  //               {tabs.map((tab) => (
  //                 <option key={tab.name}>{tab.name}</option>
  //               ))}
  //             </select>
  //           </div>
  //         </div>
  //         <div className="hidden sm:block">
  //           <div>
  //             <nav
  //               className="-mb-px flex space-x-8 flex justify-center items-center"
  //               aria-label="Tabs"
  //             >
  //               {tabs.map((tab) => (
  //                 <a
  //                   key={tab.name}
  //                   href={tab.href}
  //                   className={classNames(
  //                     tab.current
  //                       ? "border-indigo-500 text-indigo-600"
  //                       : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
  //                     "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-2xl"
  //                   )}
  //                   aria-current={tab.current ? "page" : undefined}
  //                 >
  //                   {tab.name}
  //                 </a>
  //               ))}
  //             </nav>
  //           </div>
  //         </div>

  //         <div className="max-w-xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
  //           <ul
  //             role="list"
  //             className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
  //           >
  //             <li>
  //               <EventCard
  //                 eid={1}
  //                 title={"Wu-Tang Clan & Nas: NY State Of Mind Tour"}
  //               />
  //             </li>
  //           </ul>
  //         </div>
  //       </div>
  //     </main>
  //   </div>
  //       </div>
  //     </>
  //   );
}
