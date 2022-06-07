import { RefObject } from "react";
import useEventListener from "./useEvenListener";

type Handler = (event: MouseEvent) => void;

const useClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: Handler,
): void => {
  useEventListener("mousedown", (event) => {
    const el = ref?.current;

    if (!el || el.contains(event.target as Node)) {
      return;
    }

    handler(event as unknown as MouseEvent);
  });
};

export default useClickOutside;
