import { useEffect, useState } from "react";
import { getFromSession } from "utils/functions";
import useCustomSessionStorage from "./useCustomSessionStorage";

export const usePageIndex = (pageIndexName: string) => {
  const [pageIdx, setPageIdx] = useCustomSessionStorage(pageIndexName);
  useEffect(() => {
    setPageIdx(getFromSession(pageIndexName) ? getFromSession(pageIndexName) : 1);
  }, [pageIndexName, setPageIdx]);
  return {
    pageIdx,
    setPageIdx,
  };
};
