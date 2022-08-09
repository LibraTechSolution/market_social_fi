import { AxiosResponse } from "axios";
import { GeckoSimplePriceBody, GeckoSimplePriceResponse } from "./index.interface";
import { geckoRequest } from "api/request/index.api";

export const getListNFTPrice = (
  query: GeckoSimplePriceBody,
): Promise<AxiosResponse<GeckoSimplePriceResponse>> => {
  return geckoRequest.get<GeckoSimplePriceResponse>("/simple/price", {
    params: query,
  });
};
