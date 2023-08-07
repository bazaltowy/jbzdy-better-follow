import { AxiosRequestConfig } from "axios";

export type EndpointFactory<Body, ResultType, TransformedResult> = () => {
  query: (body: Body) => AxiosRequestConfig;
  transform?: (result: ResultType) => TransformedResult;
};
