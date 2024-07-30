import { useCallback } from 'react';
import { RequestMethod } from '../../enums/requestMethod.enum';
import { RequestOptions } from '../../interfaces/requestOption.interface';

export const useFetchWrapper = () => {
  const apiUrl = 'https://fortescrow-35a70a0b1913.herokuapp.com'

  const handleResponse = useCallback((response: any) => {
    return response.text().then(async (text: string) => {
      const data = text && JSON.parse(text);

      if (!response.ok) {
        const error =
          (data && data.message) ||
          response.statusText ||
          (data && data.errors);

        return { error, code: response.status };
      }

      return data;
    });
  }, []);

  const request = useCallback((method: RequestMethod) => {
    return (url: string, body?: any) => {
      const requestOptions: RequestOptions = {
        method,
        headers: {},
      };

      if (body) {
        requestOptions.headers['Content-Type'] = 'application/json';
        requestOptions.body = JSON.stringify(body);
      }

      console.log(requestOptions);

      return fetch(`${apiUrl}/${url}`, requestOptions as RequestInit)
        .then((response) => handleResponse(response))
        .catch((err) => {
          return { error: err };
        });
    };
  }, []);

  return {
    get: request(RequestMethod.GET),
    post: request(RequestMethod.POST),
    put: request(RequestMethod.PUT),
    delete: request(RequestMethod.DELETE),
    patch: request(RequestMethod.PATCH),
  };
};
