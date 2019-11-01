import "isomorphic-fetch";
import { enviornment } from "enviornment";
import { Auth } from "auth";

interface RequestOptions {
  auth?: boolean;
}

function getHeaders(): any {
  const defaultHeaders = {
    "Content-Type": "application/json"
  };
  return Auth.isUserAuthenticated()
    ? { ...defaultHeaders, Authorization: `bearer ${Auth.getToken()}` }
    : defaultHeaders;
}

export function requestFetch(
  url: string,
  opts: RequestOptions,
  init?: RequestInit
): Promise<any> {
  const { body } = init || ({} as RequestInit);

  return new Promise((resolve, reject) => {
    fetch(`/api${url}`, {
      ...init,
      headers: new Headers(getHeaders()),
      body: body && JSON.stringify(body)
    })
      .then(response => {
        if (response.ok) {
          resolve(response.json());
        } else {
          reject(response);
        }
      })
      .catch(reject);
  });
}

export function get(url: string): Promise<any> {
  return requestFetch(url, {});
}

export function post(url: string, body: any, opts?: RequestOptions) {
  return requestFetch(url, { ...opts }, { method: "POST", body });
}
