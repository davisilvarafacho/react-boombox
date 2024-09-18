import { AxiosInstance } from 'axios';

import { backend } from 'services/backend';
import { obj2query } from 'utils/urls';

type UseApiOptions = {
  service?: AxiosInstance;
  version?: string;
};

type RequestOptions = UseApiOptions & { endpoint: ApiEndpoint };

export function useApi<T>(
  defaultEndpoint: ApiEndpoint,
  defaultOptions: UseApiOptions | null = null
) {
  function normalizeOptions(requestOptions?: RequestOptions) {
    const service = requestOptions?.service ?? defaultOptions?.service ?? backend;
    const version = requestOptions?.version ?? defaultOptions?.version ?? 'v1';
    const endpoint = requestOptions?.endpoint ?? defaultEndpoint;

    return { service, version, endpoint };
  }
  
  async function sendGetList<Y extends T | unknown>(
    filtros: {},
    options?: RequestOptions
  ): Promise<ListApiResponse<Y>> {
    const { service, version, endpoint } = normalizeOptions(options);

    const urlParams = `?${obj2query(filtros)}`;
    const uri = `${version}/${endpoint}/${urlParams}`;
    const response = await service
      .get(uri)
      .then((res) => ({
        $status: res.status,
        ...res.data,
      }))
      .catch((err) => ({
        $status: err.response ? err.response.status : null,
        ...(err.response ? err.response.data : {}),
      }));

    return response;
  }

  async function sendGetRetrieve<Y extends T | unknown>(
    id: number,
    options?: RequestOptions
  ): Promise<Y> {
    const { service, version, endpoint } = normalizeOptions(options);

    const uri = `${version}/${endpoint}/${id}/`;
    const response = await service
      .get(uri)
      .then((res) => ({
        $status: res.status,
        ...res.data,
      }))
      .catch((err) => ({
        $status: err.response ? err.response.status : null,
        ...(err.response ? err.response.data : {}),
      }));

    return response;
  }

  async function sendGetRetrieveByFilters<Y extends T | unknown>(
    filtros: {},
    options?: RequestOptions
  ): Promise<Y> {
    const { service, version, endpoint } = normalizeOptions(options);

    const urlParams = `?${obj2query(filtros)}`;
    const uri = `${version}/${endpoint}/${urlParams}`;
    const response = await service
      .get(uri)
      .then((res) => ({
        $status: res.status,
        ...res.data,
      }))
      .catch((err) => ({
        $status: err.response ? err.response.status : null,
        ...(err.response ? err.response.data : {}),
      }));

    return response;
  }

  async function sendPost<Y extends T | unknown>(dados: {}, options?: RequestOptions): Promise<Y> {
    const { service, version, endpoint } = normalizeOptions(options);

    const uri = `${version}/${endpoint}/`;
    const response = await service
      .post(uri, dados)
      .then((res) => ({
        $status: res.status,
        ...res.data,
      }))
      .catch((err) => ({
        $status: err.response ? err.response.status : null,
        ...(err.response ? err.response.data : {}),
      }));

    return response;
  }

  async function sendPatch(dados: {}, options?: RequestOptions) {
    const { service, version, endpoint } = normalizeOptions(options);

    const uri = `${version}/${endpoint}/`;
    const response = await service
      .patch(uri, dados)
      .then((res) => ({
        $status: res.status,
        ...res.data,
      }))
      .catch((err) => ({
        $status: err.response ? err.response.status : null,
        ...(err.response ? err.response.data : {}),
      }));

    return response;
  }

  async function sendPut(dados: {}, options?: RequestOptions) {
    const { service, version, endpoint } = normalizeOptions(options);

    const uri = `${version}/${endpoint}/`;
    const response = await service
      .put(uri, dados)
      .then((res) => ({
        $status: res.status,
        ...res.data,
      }))
      .catch((err) => ({
        $status: err.response ? err.response.status : null,
        ...(err.response ? err.response.data : {}),
      }));

    return response;
  }

  async function sendDelete(options?: RequestOptions) {
    const { service, version, endpoint } = normalizeOptions(options);

    const uri = `${version}/${endpoint}/`;
    const response = await service
      .put(uri)
      .then(() => null)
      .catch((err) => ({
        $status: err.response ? err.response.status : null,
        ...(err.response ? err.response.data : {}),
      }));

    return response;
  }

  return {
    sendGetList,
    sendGetRetrieve,
    sendGetRetrieveByFilters,
    sendPost,
    sendPatch,
    sendPut,
    sendDelete,
  };
}
