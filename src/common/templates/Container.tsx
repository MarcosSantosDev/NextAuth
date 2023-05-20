import * as React from "react";

const Container = ({ children }: React.PropsWithChildren<unknown>) => {
  return <div className="max-w-full max-h-full">{children}</div>;
};

export default Container;
