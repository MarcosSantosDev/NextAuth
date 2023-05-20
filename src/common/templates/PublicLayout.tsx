import * as React from "react";
import { AuthProvider } from "@/common/context";

const PublicLayout = ({ children }: React.PropsWithChildren<unknown>) => {
  return (
    <div className="max-w-full max-h-full">
      <AuthProvider>
        {children}
      </AuthProvider>
    </div>
  );
};

export default PublicLayout;
