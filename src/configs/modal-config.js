import { FamilyModal } from "components/modals/FamilyModal";
import { TaskModal } from "components/modals/TaskModal";
import { ProfileModal } from "components/modals/ProfileModal";

const MODAL_TYPES = {
  FAMILY_MODAL: "familyModal",
  TASK_MODAL: "taskModal",
  PROFILE_MODAL: "profileModal"
};

const MODALS = {
  [MODAL_TYPES.FAMILY_MODAL]: FamilyModal,
  [MODAL_TYPES.TASK_MODAL]: TaskModal,
  [MODAL_TYPES.PROFILE_MODAL]: ProfileModal,
};

const MODAL_MODE = {
  ADD: "addMode",
  EDIT: "editMode",
};

export { MODAL_TYPES, MODALS, MODAL_MODE };
