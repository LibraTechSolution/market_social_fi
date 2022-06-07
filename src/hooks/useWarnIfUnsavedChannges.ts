import { useEffect } from "react";
import Router from "next/router";

export function useWarnIfUnsavedChanges(unsavedChanges: boolean = false) {
  useEffect(() => {
    const routeChangeStart = (url: string) => {
      if (Router.asPath !== url && unsavedChanges) {
        const result = window.confirm(
          "If you leave this page, any unsaved changes will be lost",
        );
        if (!result) {
          Router.events.emit("routeChangeError");
          throw "Abort route change. Please ignore this error.";
        }
      }
    };

    const beforeunload = (e: BeforeUnloadEvent) => {
      if (unsavedChanges) {
        e.preventDefault();
        e.returnValue =
          "If you leave this page, any unsaved changes will be lost";
        return "If you leave this page, any unsaved changes will be lost";
      }
    };

    window.addEventListener("beforeunload", beforeunload);
    Router.events.on("routeChangeStart", routeChangeStart);

    return () => {
      window.removeEventListener("beforeunload", beforeunload);
      Router.events.off("routeChangeStart", routeChangeStart);
    };
  }, [unsavedChanges]);
}
