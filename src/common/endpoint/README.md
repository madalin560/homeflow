# Request component

### Overview

`Request` is the service used for data fetching. The base implementation is based on native `fetch`
api. The exact implementation can be found in `api-handler`.

We expose this service via a javascript native `Proxy` in order to have a `Promise` that we can await.

### Example usage

```javascript
Request.apiHandler
  .deleteCollege([id])
  .then(() => {
    ToastService.showSuccessToast();
    fetchData();
  })
  .catch((reason) => ToastService.showErrorToast(reason));
```

#### How to define a Request

1. Declare the API path in `endpoint-paths.js`
2. Create a method in `fetch-service` using the implementation from `api-handler` for each request type and the path defined above

```javascript
addTeacher = (payload) => {
  return this.post(ENDPOINT_PATHS.ADD_TEACHER, payload);
};
```

Above example illustrate a post request to `ENDPOINT_PATHS.ADD_TEACHER` with a certain payload that we send to backend.
Other request types that can be used are:

1. this.get -> `GET` fetch
2. this.post -> `POST` fetch
3. this.delete -> `DELETE` fetch
4. this.upload -> `POST` fetch with `form-data` payload
