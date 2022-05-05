import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import Link from "next/link";
import Image from "next/image";

export default function Navbar({ preferedColorScheme }) {
  return (
    <Disclosure as="nav" className="">
      {({ open }) => (
        <>
          <div className="mx-auto">
            <div className="flex items-center justify-between h-16 ">
              <div className="sm:flex sm:items-center sm:gap-4">
                {preferedColorScheme === "light" && (
                  <Link href="/" passHref>
                    <Image
                      className="cursor-pointer"
                      alt="Women Build Web3 Logo"
                      src="/logos/Logo-Fill.png"
                      height="40px"
                      width="40px"
                    />
                  </Link>
                )}
                {preferedColorScheme === "dark" && (
                  <Link href="/" passHref>
                    <Image
                      className="cursor-pointer"
                      alt="Women Build Web3 Logo"
                      src="/logos/logo-white.png"
                      height="40px"
                      width="40px"
                    />
                  </Link>
                )}
                <Link className="hidden sm:block" href="/" passHref>
                  <div className="hidden sm:block cursor-pointer font-poppins-bold text-xl">
                    web3rsvp
                  </div>
                </Link>
              </div>

              <div className="hidden md:block md:ml-6">
                <div className="flex">
                  <Link href="/contact" passHref>
                    <a className="cursor-pointer dark:hover:text-black dark:hover:bg-white hover:text-white hover:bg-black border border-black dark:border-white border-solid rounded-full text-xl px-3 py-2">
                      Create Wallet
                    </a>
                  </Link>
                  <Link href="/contact" passHref>
                    <a className="cursor-pointer dark:hover:text-black dark:hover:bg-white hover:text-white hover:bg-black border border-black dark:border-white border-solid rounded-full text-xl px-3 py-2">
                      Create Event
                    </a>
                  </Link>
                </div>
              </div>
              <div className="flex items-center gap-4 md:hidden">
                <Link href="/contact" passHref>
                  <a className="px-4 h-8 grid place-items-center cursor-pointer dark:hover:text-black dark:hover:bg-white hover:text-white hover:bg-black border border-black dark:border-white border-solid rounded-full">
                    Create Event
                  </a>
                </Link>

                <div className="-mr-2 flex">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="link inline-flex items-center justify-center p-2 rounded-md hover:text-white hover:bg-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon
                        className="block h-8 w-8 mobile-menu-button"
                        aria-hidden="true"
                      />
                    ) : (
                      <MenuIcon
                        className="block h-8 w-8 mobile-menu-button"
                        aria-hidden="true"
                      />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}
