import { ParamsBaseApi } from "../base/TypesBaseService";
import { DataProduct } from "~/models/subscription/DataProduct";

// PARAMETER INPUT PART
export interface ParamsGetStripeCheckoutApi extends ParamsBaseApi {
  paramPriceId: number | string;
}

export interface ParamsGetStripeBillingPortalApi extends ParamsBaseApi {}

// API RESPONSE PART
export interface DataProductsAndInterval {
  products: DataProduct[];
  intervals: string[];
}
