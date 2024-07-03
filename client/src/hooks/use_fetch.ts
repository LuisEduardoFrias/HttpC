//
import { useState, useEffect } from 'react';

export enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

type TFetchProps = {
  url: string;
  method?: Method;
  body?: BodyInit;
};

export type Result = {
  data: object | null;
  error: object | null;
};

export default function useFetch(baseUrl: string) {
  const [dataFetch, setFetch] = useState<TFetchProps>(null);
  const [data, setData] = useState<Result>({ data: null, error: null });
  const [loading, setLoading] = useState(false);

  function _fetch({ url, method = Method.GET, body = null }: TFetchProps) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    //   headers.append('Access-Control-Allow-Origin', 'http://localhost:8080');
    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append('GET', 'POST', 'PUT', 'DELETE');
    // headers.append('Authorization','Basic ' + base64.encode(username + ':' + password));

    return fetch(joinURLs(baseUrl, url), {
      method: method,
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: headers,
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: body ? JSON.stringify(body) : null,
    });
  }

  function joinURLs(baseUrl: string, url: string): string {
    const baseUrlFinal = baseUrl.endsWith('/') ? baseUrl : baseUrl + '/';
    const urlFinal = url.startsWith('/') ? url.substring(1) : url;

    return baseUrlFinal + urlFinal;
  }

  useEffect(() => {
    if (dataFetch) {
      setData({ data: null, error: null });
      setLoading(true);

      setTimeout(() => {
        _fetch(dataFetch)
          .then((response) => {
            console.log(
              'statustext: ',
              response.statusText,
              'status: ',
              response.status
            );

            if (!response.ok) {
              throw new Error('Error al recuperar el HTML');
            }

            return response.json();
          })
          .then((data) => {
            setData({ data: data, error: null });
          })
          .catch((err) => {
            console.log('fetch: ', err);
            setData({ data: null, error: 'Hubo un problema con la solicitud' });
          })
          .finally(() => {
            setLoading(false);
            setFetch(null);
          });
      }, 500);
    }
  }, [dataFetch]);

  return [setFetch, data, loading];
}
