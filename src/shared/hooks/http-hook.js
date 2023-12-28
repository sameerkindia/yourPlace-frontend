import { useCallback, useRef, useState } from "react";

export function useHttpClient() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const activeHttpRequest = useRef([]);

  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setIsLoading(true);
      const httpAbortCtrl = new AbortController();
      activeHttpRequest.current.push(httpAbortCtrl);

      try {
        const res = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortCtrl.signal,
        });
        const data = await res.json();

        // activeHttpRequest.current = activeHttpRequest.current.filter(
        //   (reqCtrl) => reqCtrl !== httpAbortCtrl
        // );

        if (!res.ok) {
          throw new Error(data.message);
        }

        return data;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  // useEffect(() => {
  //   return () => {
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //     activeHttpRequest.current.forEach((abortCtrl) => abortCtrl.abort());
  //   };
  // }, []);

  return { isLoading, error, sendRequest, clearError };
}
