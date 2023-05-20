import * as React from "react";
import Header from "@/common/components/Header";

import PublicLayout from "./PublicLayout";

const Layout = ({ children }: React.PropsWithChildren<unknown>) => {
  return (
    <PublicLayout>
      <Header />
      {children}
    </PublicLayout>
  );
};

export default Layout;
