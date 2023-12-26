import type { GetServerSidePropsContext } from "next";
import type { ReactElement } from 'react';

import Can from "@/common/components/Can";

import { withSSRAuth } from "@/common/utils/withSSRAuth";
import type { UserData } from "@/common/types/user";
import { AuthenticatedLayout } from "@/common/templates";
import { setupSSRHttp } from "@/common/services/http";

type HomeProps = {
  user: UserData | null;
};

export default function Home({ user }: HomeProps) {
  return (
    <main className="w-full h-screen flex justify-center items-center">
      <div className="grid justify-center content-center gap-4 text-center">
        <h2 className="text-lg font-normal font-pressStart2P">
          Welcome to home  {user?.email}
        </h2>
        <div className="flex justify-center content-center gap-4">
          <Can permissions={["metrics.list"]}>
            <div className="w-80 p-4 border-2 shadow-sm rounded-md">
              <h6 className="text-lg font-bold">Metrics</h6>
              <ul>
                <li>Metric 01</li>
                <li>Metric 02</li>
              </ul>
            </div>
          </Can>

          <Can permissions={["users.list"]}>
            <div className="w-80 p-4 border-2 shadow-sm rounded-md">
              <h6 className="text-lg font-bold">User List</h6>
              <ul>
                <li>User 01</li>
                <li>User 02</li>
              </ul>
            </div>
          </Can>
        </div>
      </div>
    </main>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <AuthenticatedLayout>
      {page}
    </AuthenticatedLayout>
  )
}

export const getServerSideProps = withSSRAuth<HomeProps>(
  async (context: GetServerSidePropsContext) => {
    const http = setupSSRHttp(context)
    const user = await http.get<UserData>("me");

    return {
      props: {
        user: user.data,
      },
    };
  }
);
