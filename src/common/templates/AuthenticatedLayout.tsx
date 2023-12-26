import * as React from "react";
import { Home } from 'lucide-react';

import Header from "@/common/components/Header";
import { Sidebar, SidebarItem } from "@/common/components/Sidebar";
import { SidebarProvider } from "@/common/components/Sidebar/context/SidebarContext";

const AuthenticatedLayout = ({ children }: React.PropsWithChildren<unknown>) => {
  return (
    <div className="grid grid-cols-appWithSidebar">
      <SidebarProvider>
        <Sidebar>
          <SidebarItem active alert icon={<Home size={20} />} text='Home' />
        </Sidebar>
      </SidebarProvider>
      <main className="max-h-screen overflow-y-scroll">
        <Header />
        {children}
      </main>
    </div>
  );
};

export default AuthenticatedLayout;
