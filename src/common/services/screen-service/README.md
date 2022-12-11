# Screens

### Overview

`Screens` are an essential service for MAO which is built on a factory design pattern using Redux.

The reason for this is the need of this service to be available across the app and the number of different modals used.

The main use of screens is to display more info about a specific entity.

### How to declare a screen?

1. Create the Screen in `src/components/screens`. This can be done by using `BaseScreen` component and adding the needed content for every specific entity.
2. Add the new created modal to the global mapping file `src/config/screens-config`.

### How to open the screen?

To use the newly created screen above, we will need to use the `ScreenService` that receives the id from the config file and a payload for the screen.

This service is a wrapper for the connection to redux and will further dispatch the open action which will cause the `ScreenFactory` to render the desired screen with the provided payload.

```javascript
ScreenService.openScreen({
  type: SCREEN_TYPES.TEACHER_DETAILS,
  onClose: fetchTeachers,
  ...record,
});
```
