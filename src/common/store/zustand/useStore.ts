import { useState, useEffect } from 'react'
/**
 * useStore is a hook to use at zustand hook. 
 * 
 * It do the zustand hook wait the server page be loaded, to be there hydrate the component.
 * 
 * Docs with more details: https://docs.pmnd.rs/zustand/integrations/persisting-store-data#usage-in-next.js
 * 
 */
const useStore = <T, F>(
  store: (callback: (state: T) => unknown) => unknown,
  callback: (state: T) => F,
) => {
  const result = store(callback) as F
  const [data, setData] = useState<F>()

  useEffect(() => {
    setData(result)
  }, [result])

  return data
}

export default useStore