import Link from "next/link";

import * as services from "@/common/services/requests";

export default function About() {
  
  const fetcheUserData = () => {
    services.getUser();
  }

  fetcheUserData()

  return (
    <main className="w-full h-screen grid grid-cols-3 grid-rows-1 justify-center items-center">
      <div className="col-start-2 col-end-3 flex flex-col gap-4 text-center">
        <h2 className="text-lg font-normal font-pressStart2P">
        Welcome to About Page
        </h2>

        <button type="button" onClick={fetcheUserData}>
          Fetch user
        </button>

        <Link href='/home' className="h-fit p-2 text-center text-black font-bold bg-transparent border-2 border-black rounded-md">
          Go to home page
        </Link>
      </div>
    </main>
  );
}
