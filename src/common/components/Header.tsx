import Link from "next/link";

import { useAuthContext } from "@/common/context";

const Header = () => {
  const authContext = useAuthContext();

  if (authContext && authContext.isAuthenticated) {
    return (
      <header className="max-w-full w-screen h-20 px-4 flex justify-between items-center border-b-2 border-b-blue-200">
        <h4 className="text-sm whitespace-nowrap font-normal font-pressStart2P">
          Next.js Authentication
        </h4>

        <div className="flex justify-end items-center gap-10">
          <nav className="">
            <Link href='/metrics' className="font-bold underline">Metrics</Link>
          </nav>

          <div className="flex justify-end items-center gap-2">
            <p className="text-black font-bold">{authContext.user?.email}</p>

            <div className="w-10 h-10 flex justify-center items-center bg-black rounded-full"/>

            <button
              type="button"
              className="w-fit h-10 px-4 py-1 text-gray-600 border-2 border-gray-600 rounded-md font-bold"
              onClick={() => authContext.signOut()}
            >
              Signout
            </button>
          </div>
        </div>
      </header>
    );
  }

  return null;
}

export default Header;