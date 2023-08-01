import makeAutoObservable from "mobx-store-inheritance";
import { ParamsBaseApi } from "../base/TypesBaseService";
import { TypePromiseApiResponse } from "../response/TypesApiResponseHandler";
import { BaseService } from "../base/BaseService";
import { IProductsService } from "./IProductsService";
import {
  ParamsGetStripeCheckoutApi,
  ParamsGetStripeBillingPortalApi,
  ApiResponseProductsAndIntercal,
} from "./TypeProductsService";
import { Interval } from "~/models/subscription/Interval";
import { Product } from "~/models/subscription/Product";
import { TypeProduct } from "~/types/subscription/TypeProduct";

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

  async fetchProducts(data: ParamsBaseApi): TypePromiseApiResponse {
    const fetch = useCustomFetch();

    return await fetch.request({
      url: ProductsService.PRODUCTS_URL,
      method: "GET",
      locale: data.locale,
    });
  }

  async getStripeCheckout(
    data: ParamsGetStripeCheckoutApi
  ): TypePromiseApiResponse {
    const fetch = useCustomFetch();

    return await fetch.request({
      url: this.parseUrl({
        template: ProductsService.CREATE_STRIPE_CHECKOUT_SESSION,
        templateData: { priceId: data.paramPriceId },
      }),
      method: "GET",
      locale: data.locale,
      accessToken: true,
      refreshToken: true,
    });
  }

  async getStripeBillingPortal(data: ParamsGetStripeBillingPortalApi) {
    const fetch = useCustomFetch();

    return await fetch.request({
      url: ProductsService.CREATE_STRIPE_BILLING_PORTAL,
      method: "GET",
      locale: data.locale,
      accessToken: true,
      refreshToken: true,
    });
  }

  setProductsAndInterval(responseData: ApiResponseProductsAndIntercal) {
    const featuredProducts: Product[] = [];
    const otherProducts: Product[] = [];
    const intervals: Interval[] = [];

    responseData.products.forEach((product: TypeProduct) => {
      const newProduct = new Product({
        id: product.id,
        name: product.name,
        featured: product.featured,
        prices: product.prices,
        uniqueSellingPoints: product.unique_selling_points,
      });

      if (newProduct.featured) {
        featuredProducts.push(newProduct);
      } else {
        otherProducts.push(newProduct);
      }
    });

    const sortedProducts = [
      ...otherProducts.slice(0, Math.ceil(otherProducts.length / 2)),
      ...featuredProducts,
      ...otherProducts.slice(Math.ceil(otherProducts.length / 2)),
    ];

    responseData.intervals.forEach((interval: string) => {
      intervals.push(
        new Interval({
          id: Math.random(),
          value: interval,
          label: `pricing.${interval}`,
        })
      );
    });

    this.clearProducts();
    this.clearIntervals();
    this.products = sortedProducts;
    this.intervals = intervals;
    this.interval = intervals[0];
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
