const GET = "get",
  POST = "post",
  PUT = "put",
  DELETE = "delete";

const CONTENT_TYPES = {
  JSON: "application/json",
  FORM: "multipart/form-data",
};

const HEADERS = {
  ACCEPT: "Accept",
  AUTHORIZATION: "Authorization",
  CONTENT_TYPE: "Content-Type",
  CONNECTION: "Connection",
};

const BASE_HEADERS = {
  [HEADERS.ACCEPT]: CONTENT_TYPES.JSON,
  [HEADERS.CONTENT_TYPE]: CONTENT_TYPES.JSON,
  [HEADERS.CONNECTION]: "Close",
};

const getHeaders = (token) => {
  const baseHeaders = BASE_HEADERS;

  if (token) {
    Object.assign(baseHeaders, {
      [HEADERS.AUTHORIZATION]: `Bearer ${token}`,
    });
  }

  return baseHeaders;
};

const rejectResponse = (response, error) => {
  error.status = response.status;
  return Promise.reject(error);
};

const parseJson = (response) => {
  if (response.status === 403) {
    return Promise.reject("Forbidden");
  }

  return response
    .json()
    .catch((parseError) => rejectResponse(response, parseError))
    .then(
      (json) => (response.ok ? json : Promise.reject(json)),
      (reason) =>
        response.status === 204 ? {} : rejectResponse(response, reason)
    );
};

const apiHandler = {
  get(token, url) {
    return fetch(url, {
      headers: {
        ...getHeaders(token),
      },
      method: GET,
    })
      .then(parseJson)
      .catch((error) => Promise.reject(error));
  },
  post(token, url, payload) {
    return fetch(url, {
      headers: {
        ...getHeaders(token),
      },
      method: POST,
      ...(payload && {
        body: JSON.stringify(payload),
      }),
    })
      .then(parseJson)
      .catch((error) => Promise.reject(error));
  },
  put(token, url, payload) {
    return fetch(url, {
      headers: {
        ...getHeaders(token),
      },
      method: PUT,
      ...(payload && {
        body: JSON.stringify(payload),
      }),
    })
      .then(parseJson)
      .catch((error) => Promise.reject(error));
  },
  delete(token, url) {
    return fetch(url, {
      headers: {
        ...getHeaders(token),
      },
      method: DELETE,
    })
      .then(parseJson)
      .catch((error) => Promise.reject(error));
  },
  upload(token, url, payload) {
    const formattedPayload = new FormData();
    Object.keys(payload).forEach((key) => {
      formattedPayload.append(key, payload[key]);
    });

    return fetch(url, {
      headers: {
        [HEADERS.ACCEPT]: CONTENT_TYPES.JSON,
        [HEADERS.CONNECTION]: "Close",
        [HEADERS.AUTHORIZATION]: `Bearer ${token}`,
      },
      method: POST,
      ...(payload && {
        body: formattedPayload,
      }),
    })
      .then(parseJson)
      .catch((error) => Promise.reject(error));
  },
  download(token, url) {
    return fetch(url, {
      headers: {
        ...getHeaders(token),
      },
      method: GET,
    }).catch((error) => Promise.reject(error));
  },
};

export default apiHandler;
