import { create } from 'zustand'

type ErrorState = {
  error: {
    visible: boolean;
    message: string;
  }
}

type ErrorActions = {
  setError: (message: string) => void;
  clearError: () => void;
}

type ErrorData = ErrorState & ErrorActions

const initialState: ErrorState = {
  error: {
    visible: false,
    message: ''
  }
};

export const useError = create<ErrorData>((set) => ({
  ...initialState,
  setError: (message: string) => {
    set({
      error: {
        visible: true,
        message
      }
    })
  },
  clearError: () => {
    set(initialState)
  }
}))