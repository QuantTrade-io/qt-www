export interface IBaseService {
  parseUrl({
    template,
    templateData,
    queryParams,
  }: {
    template: string;
    templateData?: { [key: string]: boolean | number | string };
    queryParams?: {
      [key: string]: string | boolean | number | [string, boolean, number];
    };
  }): string;
}
