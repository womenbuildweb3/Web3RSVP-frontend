import Image from "next/image";
import Link from "next/link";

export default function EventCard({ eid, title }) {
  return (
    <div className="group relative">
      <div className="block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80"
          alt="image"
          className="object-cover pointer-events-none group-hover:opacity-75"
        ></img>
        <button type="button" className="absolute inset-0 focus:outline-none">
          <span className="sr-only">View details for {title}</span>
        </button>
      </div>
      <p className="mt-2 block text-sm font-medium text-gray-500 pointer-events-none">
        TUE · OCT 4 · 8:00 PM
      </p>
      <Link href={`/event/${eid}`}>
        <a className="block text-base text-gray-900">{title}</a>
      </Link>
    </div>
  );
}
