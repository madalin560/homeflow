import { useDispatch } from "react-redux";
// import { useSelector, useDispatch } from "react-redux";
// import _ from "lodash";

import { modalActions } from "./actions/modals";

// Reading data from redux by proxying the slice
// const stateProxy = (slice) =>
//     new Proxy(
//         {},
//         {
//             get: (target, prop) => {
//                 return {};
//             },
//         }
//     );

// Dispatching actions
const useReduxActions = (actionGenerator) => {
  const dispatcher = useDispatch();
  return actionGenerator(dispatcher);
};

// const useModalStore = _.constant(stateProxy("modals"));
const useModalActions = () => useReduxActions(modalActions);

// export { useModalStore, useModalActions };
export { useModalActions };
