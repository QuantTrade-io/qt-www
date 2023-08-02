import { ParamsBaseApi } from "../base/TypesBaseService";
import { TypePromiseApiResponse } from "../response/TypesApiResponseHandler";
import {
  DataProductsAndInterval,
  ParamsGetStripeBillingPortalApi,
  ParamsGetStripeCheckoutApi,
} from "./TypeProductsService";
import { IInterval } from "~/models/subscription/IInterval";
import { IProduct } from "~/models/subscription/IProduct";

export interface IProductsService {
  products: IProduct[];
  intervals: IInterval[];
  interval: IInterval;

  getProducts(params: ParamsBaseApi): void;
  getStripeCheckout(params: ParamsGetStripeCheckoutApi): TypePromiseApiResponse;
  getStripeBillingPortal(
    params: ParamsGetStripeBillingPortalApi
  ): TypePromiseApiResponse;

  setProductsAndInterval(responseData: DataProductsAndInterval): void;
  clearProducts(): void;
  clearIntervals(): void;

  getInterval(): IInterval;
  setInterval(interval: IInterval): void;
}
