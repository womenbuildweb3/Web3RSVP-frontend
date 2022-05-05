import Image from "next/image";
import Link from "next/link";

export default function Footer({ preferedColorScheme }) {
  return (
    <footer className="py-32">
      <hr className="mb-16 border-t border-black dark:border-white border-solid" />
      <div className="grid md:grid-cols-2">
        <div className="max-w-sm">
          <div className="mb-4 text-2xl sm:text-3xl font-poppins-bold">
            eventmint
          </div>
        </div>

        <div className="grid sm:grid-cols-3">
          <div className="flex mb-8 sm:mb-0 flex-col gap-4">
            <Link href="/" passHref>
              <div className="cursor-pointer max-w-[160px]">
                30 Days of Web3
              </div>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
