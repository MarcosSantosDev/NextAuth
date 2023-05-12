import * as React from 'react';

import useCan from '@/common/hooks/useCan';
import type { UseCanHookProps } from '@/common/hooks/useCan';

type CanProps = UseCanHookProps & {
  children: React.ReactNode;
}

const Can = ({ children, ...canRestProps }: CanProps) => {
  const userCanSeeComponent = useCan({ ...canRestProps });
  
  if (!userCanSeeComponent) {
    return null;
  }

  return <>{children}</>;
}

export default Can;