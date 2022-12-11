# Toasts

### Overview

`Toasts` are the main way to display errors / success messages for MAO. The implementation is based on a factory pattern with a Redux implementation.

### How to add / modify a toast type?

All available toast types are declares in `src/configs/toasts-config`.
The config file is used to declare the title, the close time and styling for all available types of toasts.

### How to open a toast?

To open a toast, we need to take advantage of `ToastService` which is a wrapper for the Redux connection.
The responsibility of the service is to dispatch the action show / hide actions.

Currently `ToastService` allows opening two types of toasts:

1. Success toasts

```javascript
ToastService.showSuccessToast();
```

2. Error toasts which also receives a error reason

```javascript
ToastService.showErrorToast(reason);
```

### Example of using toasts with fetch service

```javascript
Request.apiHandler
  .deleteDomain([id])
  .then(() => {
    ToastService.showSuccessToast();
    fetchData();
  })
  .catch((reason) => ToastService.showErrorToast(reason));
```
