import Link from "next/link";
import type { ReactElement } from "react";

import { AuthenticatedLayout } from "@/common/templates";
import Can from "@/common/components/Can";

export default function Metrics() {
  return (
    <Can permissions={["metrics.list"]} fallback>
      <main className="w-full h-screen grid grid-cols-3 grid-rows-1 justify-center items-center">
        <div className="col-start-2 col-end-3 flex flex-col gap-4 text-center">
          <h2 className="text-lg font-normal font-pressStart2P">
          Welcome to Metrics Page
          </h2>

          <Link href='/home' className="h-fit p-2 text-center text-black font-bold bg-transparent border-2 border-black rounded-md">
            Go to home page
          </Link>
        </div>
      </main>
    </Can>
  );
}

Metrics.getLayout = function getLayout(page: ReactElement) {
  return (
    <AuthenticatedLayout>
      {page}
    </AuthenticatedLayout>
  )
}