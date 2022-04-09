const API_BASE_URL = "https://tsapi.coronasafe.live/api";

// Takes URL, GET/POST/PUT/DELETE requests and payload and returns a promise
export const request = async function <R = any, P = object>(
  endpoint: string,
  method = "GET",
  payload: P
) {
  // Create a promise that returns the json response
  let url;
  if (method === "GET") {
    const requestParams = (payload as unknown as { [key: string]: string })
      ? `?${Object.entries(payload)
          .map(([key, val]) => `${key}=${val}`)
          .join("&")}`
      : "";

    url = `${API_BASE_URL}${endpoint}${requestParams}`;
  } else {
    url = `${API_BASE_URL}${endpoint}`;
  }
  // Basic Auth
  const token = localStorage.getItem("TOKEN");
  const auth = token ? `Token ${token}` : "";
  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: auth,
      },
      ...(payload && method !== "GET" && Object.values(payload).length > 0
        ? { body: JSON.stringify(payload) }
        : undefined),
    });
    if (response.status === 204) {
      return null;
    }
    if (response.ok) {
      const json = await response?.json();
      return json as R;
    } else {
      const errorJson = await response.json();
      throw Error(errorJson);
    }
  } catch (error) {
    throw Error(error as any);
  }
};
