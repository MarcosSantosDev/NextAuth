import * as React from "react";

import useCan from "@/common/hooks/useCan";
import type { UseCanHookProps } from "@/common/hooks/useCan";

type CanProps = UseCanHookProps & {
  children: React.ReactNode;
  fallback?: boolean;
};

const Can = ({ children, fallback = false, ...canRestProps }: CanProps) => {
  const userCanSeeComponent = useCan({ ...canRestProps });

  if (!userCanSeeComponent) {
    if (fallback) {
      return (
        <main className="w-full h-screen grid grid-cols-3 grid-rows-1 justify-center items-center">
          <div className="col-start-2 col-end-3 flex flex-col gap-4 text-center">
            <h2 className="text-lg font-normal font-pressStart2P">
              Do you do not have access this content!
            </h2>
            <p>Check your permissions with your administrator</p>
          </div>
        </main>
      );
    }
    return null;
  }

  return <>{children}</>;
};

export default Can;
