import { IBaseService } from "./IBaseService";

export class BaseService implements IBaseService {
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
  }): string {
    let processedUrl = url;
    if (urlParams) {
      Object.keys(urlParams).forEach(
        (key) =>
          (processedUrl = processedUrl.replace(
            `{${key}}`,
            urlParams[key].toString()
          ))
      );
    }
    if (queryParams) {
      let queryString = "?";
      const queryParamsKeys = Object.keys(queryParams);
      queryParamsKeys.forEach((queryParamKey: string, index: number) => {
        let resultString = `?${queryParamKey}=`;

        const queryParamValue = queryParams[queryParamKey];
        if (Array.isArray(queryParamValue)) {
          // Array
          queryParamValue.forEach((queryParamValueItem, index) => {
            resultString += queryParamValueItem;

            const isLastQueryParamValueItem =
              index === queryParamValue.length - 1;
            if (!isLastQueryParamValueItem) resultString += ",";
          });
        } else {
          // string, number, boolean
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          resultString += queryParams[queryParamKey];
        }

        let keyValue = `${queryParamKey}=${queryParams[queryParamKey]}`;

        const isLastItem = index === queryParamsKeys.length - 1;
        if (!isLastItem) keyValue += "&";

        queryString += keyValue;
      });
      processedUrl += queryString;
    }
    return processedUrl;
  }
}
