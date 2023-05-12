import type { GetServerSidePropsContext } from "next";
import Head from "next/head";

import Can from "@/common/components/Can";
import { serverHttp } from "@/common/services/http";
import { withSSRAuth } from "@/common/utils/withSSRAuth";
import type { UserData } from "@/common/types/user";

type HomeProps = {
  user: UserData;
};

export default function Home({ user }: HomeProps) {
  return (
    <>
      <Head>
        <title>App NextAuth</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h2>User: {user.email}</h2>

        <Can permissions={["metrics.list"]}>
          <strong>Metricas</strong>
        </Can>
      </main>
    </>
  );
}

export const getServerSideProps = withSSRAuth<HomeProps>(async (
  context: GetServerSidePropsContext
) => {
  const http = serverHttp(context);

  const response = await http.get<UserData>("me");

  return {
    props: {
      user: response.data,
    },
  };
});
