export interface IBaseService {
  parseUrl({
    url,
    urlParams,
    queryParams,
  }: {
    url: string;
    urlParams?: { [key: string]: boolean | number | string };
    queryParams?: {
      [key: string]: string | boolean | number | [string, boolean, number];
    };
  }): string;
}
