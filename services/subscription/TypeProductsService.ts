import { ParamsBaseApi } from "../base/TypesBaseService";

export interface ParamsGetStripeCheckoutApi extends ParamsBaseApi {
  paramPriceId: string | number;
}

export interface ParamsGetStripeBillingPortalApi extends ParamsBaseApi {}