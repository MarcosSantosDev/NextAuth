import Link from "next/link";
import type { ReactElement } from "react";

import { withSSRAuth } from "@/common/utils/withSSRAuth";
import { AuthenticatedLayout } from "@/common/templates";
import Can from "@/common/components/Can";

export default function Users() {
  return (
    <Can permissions={["users.list"]} fallback>
      <main className="w-full h-screen grid grid-cols-3 grid-rows-1 justify-center items-center">
        <div className="col-start-2 col-end-3 flex flex-col gap-4 text-center">
          <h2 className="text-lg font-normal font-pressStart2P">
          Welcome to Users Page
          </h2>

          <Link href='/home' className="h-fit p-2 text-center text-black font-bold bg-transparent border-2 border-black rounded-md">
            Go to home page
          </Link>
        </div>
      </main>
    </Can>
  );
}

Users.getLayout = function getLayout(page: ReactElement) {
  return (
    <AuthenticatedLayout>
      {page}
    </AuthenticatedLayout>
  )
}

export const getServerSideProps = withSSRAuth(async () => {
  return {
    props: {}
  }
}, {
  permissions: ['users.list'],
  roles: ['administrator']
})
