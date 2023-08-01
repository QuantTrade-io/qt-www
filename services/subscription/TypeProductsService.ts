import { IProduct } from "~/models/subscription/IProduct";
import { ParamsBaseApi } from "../base/TypesBaseService";
import { IInterval } from "~/models/subscription/IInterval";
import { TypeProduct } from "~/types/subscription/TypeProduct";
import { TypeInterval } from "~/types/subscription/TypeInterval";

// PARAMETER INPUT PART
export interface ParamsGetStripeCheckoutApi extends ParamsBaseApi {
  paramPriceId: number | string;
}

export interface ParamsGetStripeBillingPortalApi extends ParamsBaseApi {}

// API RESPONSE PART
export interface ApiResponseProductsAndIntercal {
  products: TypeProduct[];
  intervals: string[];
}
