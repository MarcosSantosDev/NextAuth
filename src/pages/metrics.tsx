import Link from "next/link";

export default function Metrics() {
  return (
    <div className="h-full flex justify-center items-center">
        <div className="grid justify-center items-center gap-4">
          <h2 className="text-lg font-normal font-pressStart2P">
            Welcome to Metrics Page
          </h2>

          <Link href='/home' className="h-fit p-2 text-center text-black font-bold bg-transparent border-2 border-black rounded-md">
            Go to home page
          </Link>
        </div>
    </div>
  );
}
