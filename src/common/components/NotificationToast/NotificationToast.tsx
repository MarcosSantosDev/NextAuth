import * as React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import useStore from '@/common/store/zustand/useStore';
import { useError } from '@/common/store/zustand/useError';

const useNotificationToast = () => {
  const errorState = useStore(useError, (state) => state)

  React.useEffect(() =>  {
    if (errorState && errorState.error.visible) {
      toast.error(errorState.error.message, {
        onClose: () => {
          errorState?.clearError()
        },
      })
    }
  }, [errorState])
}

const NotificationToast = ({ children }: React.PropsWithChildren) => {
  useNotificationToast()

  return (
    <>
      {children}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default NotificationToast;