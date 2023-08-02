import { ParamsBaseApi } from "../base/TypesBaseService";
import { TypePromiseApiResponse } from "../response/TypesApiResponseHandler";
import {
  ApiResponseProductsAndIntercal,
  ParamsGetStripeBillingPortalApi,
  ParamsGetStripeCheckoutApi,
} from "./TypeProductsService";
import { IInterval } from "~/models/subscription/IInterval";
import { IProduct } from "~/models/subscription/IProduct";

export interface IProductsService {
  products: IProduct[];
  intervals: IInterval[];
  interval: IInterval;

  fetchProducts(data: ParamsBaseApi): void;
  getStripeCheckout(data: ParamsGetStripeCheckoutApi): TypePromiseApiResponse;
  getStripeBillingPortal(
    data: ParamsGetStripeBillingPortalApi
  ): TypePromiseApiResponse;

  setProductsAndInterval(responseData: ApiResponseProductsAndIntercal): void;
  clearProducts(): void;
  clearIntervals(): void;

  getInterval(): IInterval;
  setInterval(interval: IInterval): void;
}
