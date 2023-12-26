import * as React from "react";

import Header from "@/common/components/Header";

const AuthenticatedLayout = ({ children }: React.PropsWithChildren<unknown>) => {
  return (
      <main className="max-h-screen overflow-y-scroll">
        <Header />
        {children}
      </main>
  );
};

export default AuthenticatedLayout;
