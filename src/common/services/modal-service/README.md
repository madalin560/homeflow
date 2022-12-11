# Modals

### Overview

`Modals` are an essential service for MAO which is built on a factory design pattern using Redux.

The reason for this is the need of this service to be available across the app and the number of different modals used.

### How to declare a modal?

1. Create the Modal in `src/components/modals`. This can be done by using `BaseModal` component and adding the needed content for every specific modal.
2. Add the new created modal to the global mapping file `src/config/modals-config`.

### How to open the modal?

To use the newly created modal above, we will need to use the `ModalService` that receives the id from the config file and a payload for the modal.

This service is a wrapper for the connection to redux and will further dispatch the open action which will cause the `ModalFactory` to render the desired modal with the provided payload.

```javascript
ModalService.openModal({
  type: MODAL_TYPES.DOMAIN,
  data: {
    onCreate: fetchData,
    initialData,
  },
});
```
