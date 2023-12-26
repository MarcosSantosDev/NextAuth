import Link from "next/link";

export default function About() {
  return (
    <main className="w-full h-screen grid grid-cols-3 grid-rows-1 justify-center items-center">
      <div className="col-start-2 col-end-3 flex flex-col gap-4 text-center">
        <h2 className="text-lg font-normal font-pressStart2P">
        Welcome to About Page
        </h2>

        <Link href='/home' className="h-fit p-2 text-center text-black font-bold bg-transparent border-2 border-black rounded-md">
          Go to home page
        </Link>
      </div>
    </main>
  );
}
