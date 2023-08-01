import { ParamsBaseApi } from "../base/TypesBaseService";
import { TypeProduct } from "~/types/subscription/TypeProduct";

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
