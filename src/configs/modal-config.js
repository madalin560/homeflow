import { FamilyModal } from "components/modals/FamilyModal";
import { TaskModal } from "components/modals/TaskModal";
import { ProfileModal } from "components/modals/ProfileModal";
import { AddUserModal } from "components/modals/AddUserModal";
import { RemoveUserModal } from "components/modals/RemoveUserModal";

const MODAL_TYPES = {
  FAMILY_MODAL: "familyModal",
  TASK_MODAL: "taskModal",
  PROFILE_MODAL: "profileModal",
  ADD_USER_MODAL: "addUserModal",
  REMOVE_USER_MODAL: "removeUserModal"
};

const MODALS = {
  [MODAL_TYPES.FAMILY_MODAL]: FamilyModal,
  [MODAL_TYPES.TASK_MODAL]: TaskModal,
  [MODAL_TYPES.PROFILE_MODAL]: ProfileModal,
  [MODAL_TYPES.ADD_USER_MODAL]: AddUserModal,
  [MODAL_TYPES.REMOVE_USER_MODAL]: RemoveUserModal,
};

const MODAL_MODE = {
  ADD: "addMode",
  EDIT: "editMode",
};

export { MODAL_TYPES, MODALS, MODAL_MODE };
