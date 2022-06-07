import { Part, DataV1, DataV2 } from "utils/order";

export const origin = "0x17BaFfcC78BdA50932177f3B2DDE1f1B804Cc38A";

export const CREATOR_DEAFAULT = 10000;

export const partOrigin: Part = {
  account: origin,
  value: 200,
};

export const data_v1: DataV1 = {
  payouts: [],
  originFees: [partOrigin],
};

export const data_v2: DataV2 = {
  payouts: [],
  originFees: [partOrigin],
  isMakeFill: true,
};
