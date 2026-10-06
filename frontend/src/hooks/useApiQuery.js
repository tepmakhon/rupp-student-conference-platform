import { useCallback, useEffect, useRef, useState } from "react";
import { getApiErrorMessage } from "../utils/apiError";

// Pass a stable loader (module function or useCallback). Only the latest request
// may update the screen, including after route changes, retries, or unmounts.
export default function useApiQuery(loader) {
  const [state, setState] = useState({ data: null, loading: true, error: "" });
  const [revision, setRevision] = useState(0);
  const requestId = useRef(0);
  const retry = useCallback(() => setRevision((value) => value + 1), []);

  useEffect(() => {
    const id = ++requestId.current;
    const controller = new AbortController();
    Promise.resolve().then(async () => {
      if (controller.signal.aborted) return;
      setState({ data: null, loading: true, error: "" });
      try {
        const data = await loader();
        if (!controller.signal.aborted && requestId.current === id) {
          setState({ data, loading: false, error: "" });
        }
      } catch (error) {
        if (!controller.signal.aborted && requestId.current === id) {
          setState({ data: null, loading: false, error: getApiErrorMessage(error) });
        }
      }
    });
    return () => controller.abort();
  }, [loader, revision]);

  return { ...state, retry };
}
