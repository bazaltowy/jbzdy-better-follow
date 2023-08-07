import axios from "axios";
import { EndpointFactory } from "../common/types/endpoint-factory.type";
import { defaults } from "./defaults";

export function createRequest<
  ResponseType,
  Body,
  TransformedResult = ResponseType
>(
  endpointFactory: EndpointFactory<Body, ResponseType, TransformedResult>,
  defaultConfig = defaults
) {
  return async (requestBody: Body) => {
    const { query, transform = (result: ResponseType) => result } =
      endpointFactory();

    const config = {
      ...defaultConfig,
      ...query(requestBody),
    };

    const { data, ...response } = await axios<ResponseType>(config);

    return { ...response, data: transform(data) as TransformedResult };
  };
}
