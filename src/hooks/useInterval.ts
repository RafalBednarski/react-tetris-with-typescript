import { useEffect, useRef } from "react";

export const useInterval = (callback: () => void, delay: number | null) => {
    //nice Dan Abramov Hook Link below
    const savedCallback = useRef<null | (() => void)>(null);
    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick(): void {
            if (savedCallback.current) savedCallback.current();
        }
        if (delay !== null) {
            const id = setInterval(tick, delay);
            return () => {
                clearInterval(id);
            };
        }
    }, [delay]);
};
//https://overreacted.io/making-setinterval-declarative-with-react-hooks/
