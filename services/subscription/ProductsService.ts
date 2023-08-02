import makeAutoObservable from "mobx-store-inheritance";
import { ParamsBaseApi } from "../base/TypesBaseService";
import { TypePromiseApiResponse } from "../response/TypesApiResponseHandler";
import { BaseService } from "../base/BaseService";
import { IProductsService } from "./IProductsService";
import {
  ParamsGetStripeCheckoutApi,
  ParamsGetStripeBillingPortalApi,
  DataProductsAndInterval,
} from "./TypeProductsService";
import { Interval } from "~/models/subscription/Interval";
import { Product } from "~/models/subscription/Product";

export class ProductsService extends BaseService implements IProductsService {
  /**
   * Class that holds all information regarding the Tiers, Pricing & Intervals of the application.
   *
   * @remarks
   * This class is a so-called 'service', which (in this case), provides the overall tier, pricing & intervals information.
   * The ProductsService implements the IProductsService
   *
   */
  static PRODUCTS_URL = `/v1/billing/products/`;
  static CREATE_STRIPE_CHECKOUT_SESSION = `/v1/billing/checkout-session/{priceId}`;
  static CREATE_STRIPE_BILLING_PORTAL = `/v1/billing/portal/`;

  products: Product[] = [];

  intervals: Interval[] = [];

  interval: Interval = this.intervals[0];

  constructor() {
    super();
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async getProducts(params: ParamsBaseApi): TypePromiseApiResponse {
    const fetch = useCustomFetch();

    return await fetch.request({
      url: ProductsService.PRODUCTS_URL,
      method: "GET",
      locale: params.locale,
    });
  }

  async getStripeCheckout(
    params: ParamsGetStripeCheckoutApi
  ): TypePromiseApiResponse {
    const fetch = useCustomFetch();

    return await fetch.request({
      url: this.parseUrl({
        url: ProductsService.CREATE_STRIPE_CHECKOUT_SESSION,
        urlParams: { priceId: params.paramPriceId },
      }),
      method: "GET",
      locale: params.locale,
      accessToken: true,
      refreshToken: true,
    });
  }

  async getStripeBillingPortal(
    params: ParamsGetStripeBillingPortalApi
  ): TypePromiseApiResponse {
    const fetch = useCustomFetch();

    return await fetch.request({
      url: ProductsService.CREATE_STRIPE_BILLING_PORTAL,
      method: "GET",
      locale: params.locale,
      accessToken: true,
      refreshToken: true,
    });
  }

  setProductsAndInterval(data: DataProductsAndInterval) {
    const featuredProducts: Product[] = [];
    const otherProducts: Product[] = [];

    const products = data.products.map(
      (productData) => new Product(productData)
    );

    products.forEach((product: Product) => {
      if (!product.featured) {
        otherProducts.push(product);
      } else {
        featuredProducts.push(product);
      }
    });

    const sortedProducts = [
      ...otherProducts.slice(0, Math.ceil(otherProducts.length / 2)),
      ...featuredProducts,
      ...otherProducts.slice(Math.ceil(otherProducts.length / 2)),
    ];

    this.clearProducts();
    this.clearIntervals();

    this.intervals = data.intervals.map(
      (valueData) => new Interval({ value: valueData, id: Math.random() })
    );
    this.products = sortedProducts;
    this.interval = this.intervals[0];
  }

  clearProducts(): void {
    this.products = [];
  }

  clearIntervals(): void {
    this.intervals = [];
  }

  getInterval(): Interval {
    return this.interval;
  }

  setInterval(interval: Interval): void {
    this.interval = interval;
  }
}

export const productsService = new ProductsService();
