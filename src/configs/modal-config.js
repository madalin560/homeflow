import { FamilyModal } from "components/modals/FamilyModal";
import { TaskModal } from "components/modals/TaskModal";

const MODAL_TYPES = {
  FAMILY_MODAL: "familyModal",
  TASK_MODAL: "taskModal",
};

const MODALS = {
  [MODAL_TYPES.FAMILY_MODAL]: FamilyModal,
  [MODAL_TYPES.TASK_MODAL]: TaskModal,
};

const MODAL_MODE = {
  ADD: "addMode",
  EDIT: "editMode",
};

export { MODAL_TYPES, MODALS, MODAL_MODE };
