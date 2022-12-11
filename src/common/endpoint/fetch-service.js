import queryString from "query-string";
import _ from "lodash";

import apiHandler from "./api-handler";
import { ENDPOINT_PATHS } from "./endpoint-paths";

class HttpBasedAPI {
  constructor() {
    this.baseUrl = "/api";
    this.token = "";
  }

  setToken = (newToken) => {
    this.token = newToken;
  };

  getParamUrl(path, pathVariables, params) {
    const requestPath = `${this.baseUrl}/${path}`;
    const finalPath = requestPath.replace(
      /{([^{]+)}/g,
      (unused, varIndex) => pathVariables[varIndex]
    );
    const query = _.isEmpty(params) ? "" : `?${queryString.stringify(params)}`;

    return `${finalPath}${query}`;
  }

  get(path, params, pathVariables) {
    const url = this.getParamUrl(path, pathVariables, params);

    return apiHandler.get(this.token, url);
  }

  post(path, payload, params, pathVariables) {
    const url = this.getParamUrl(path, pathVariables, params);

    return apiHandler.post(this.token, url, payload);
  }

  put(path, payload, params, pathVariables) {
    const url = this.getParamUrl(path, pathVariables, params);

    return apiHandler.put(this.token, url, payload);
  }

  upload(path, payload, pathVariables) {
    const url = this.getParamUrl(path, pathVariables);

    return apiHandler.upload(this.token, url, payload);
  }

  delete(path, pathVariables) {
    const url = this.getParamUrl(path, pathVariables);

    return apiHandler.delete(this.token, url);
  }

  download(path, params, pathVariables) {
    const url = this.getParamUrl(path, pathVariables, params);

    return apiHandler.download(this.token, url);
  }

  // Data import
  importData = (payload) => {
    return this.upload(ENDPOINT_PATHS.IMPORT_DATA, payload);
  };

  downloadTemplate = (payload) => {
    return this.download(ENDPOINT_PATHS.DOWNLOAD_TEMPLATE, payload);
  };

  generateHours = (params) => {
    return this.post(ENDPOINT_PATHS.GENERATE_HOURS, {}, params);
  };

  // Data export
  getPositionsReport = (params) => {
    return this.download(ENDPOINT_PATHS.EXPORT_POSITIONS, params);
  };

  getVacantPositionsReport = (params) => {
    return this.download(ENDPOINT_PATHS.EXPORT_VACANT_POSITIONS, params);
  };

  getMoodleStructure = (params) => {
    return this.download(ENDPOINT_PATHS.EXPORT_MOODLE_STRUCTURE, params);
  };

  getMoodleSubjects = (params) => {
    return this.download(ENDPOINT_PATHS.EXPORT_MOODLE_SUBJECTS, params);
  };

  getMoodleTeachers = (params) => {
    return this.download(ENDPOINT_PATHS.EXPORT_MOODLE_TEACHERS, params);
  };

  getMoodleCohorts = (params) => {
    return this.download(ENDPOINT_PATHS.EXPORT_MOODLE_COHORTS, params);
  };

  getMsoHours = (params) => {
    return this.download(ENDPOINT_PATHS.EXPORT_MSO_HOURS, params);
  };

  getStudyProgramSubjects = (params) => {
    return this.download(ENDPOINT_PATHS.EXPORT_STUDY_PROGRAMS_SUBJECTS, params);
  };

  // Teachers CRUD
  addTeacher = (payload) => {
    return this.post(ENDPOINT_PATHS.TEACHERS, payload);
  };

  getTeachers = (params) => {
    return this.get(ENDPOINT_PATHS.TEACHERS, params);
  };

  loadTeachers = (params) => {
    return this.get(ENDPOINT_PATHS.GET_TEACHERS, params);
  };

  getTeacherDetails = (params, pathVariables) => {
    return this.get(ENDPOINT_PATHS.TEACHER_DETAILS, params, pathVariables);
  };

  editTeacher = (payload) => {
    return this.put(ENDPOINT_PATHS.TEACHERS, payload);
  };

  deleteTeacher = (pathVariables) => {
    return this.delete(ENDPOINT_PATHS.TEACHERS_BY_ID, pathVariables);
  };

  // CollegeDepartmentTeacher CRUD
  addDepartmentTeacherAssociation = (payload) => {
    return this.post(ENDPOINT_PATHS.DEPARTMENT_TEACHERS_ASSOCIATION, payload);
  };

  getDepartmentTeacherAssociations = (params) => {
    return this.get(ENDPOINT_PATHS.GET_DEPARTMENT_TEACHERS_ASSOCIATION, params);
  };

  deleteDepartmentTeacherAssociation = (pathVariables) => {
    return this.delete(
      ENDPOINT_PATHS.DEPARTMENT_TEACHERS_ASSOCIATION_BY_ID,
      pathVariables
    );
  };

  // Subjects CRUD
  addSubject = (payload) => {
    return this.post(ENDPOINT_PATHS.SUBJECTS, payload);
  };

  getSubjects = (params) => {
    return this.get(ENDPOINT_PATHS.GET_SUBJECTS, params);
  };

  getSubjectDetails = (params, pathVariables) => {
    return this.get(ENDPOINT_PATHS.SUBJECTS, params, pathVariables);
  };

  editSubject = (payload) => {
    return this.put(ENDPOINT_PATHS.SUBJECTS, payload);
  };

  deleteSubject = (pathVariables) => {
    return this.delete(ENDPOINT_PATHS.SUBJECTS_BY_ID, pathVariables);
  };

  // Optional Subjects List CRUD
  addOptionalSubjectsList = (payload) => {
    return this.post(ENDPOINT_PATHS.OPTIONAL_SUBJECTS_LIS, payload);
  };

  getOptionalSubjectsList = (params) => {
    return this.get(ENDPOINT_PATHS.GET_OPTIONAL_SUBJECTS_LIST, params);
  };

  deleteOptionalSubjectsList = (pathVariables) => {
    return this.delete(
      ENDPOINT_PATHS.OPTIONAL_SUBJECTS_LIST_BY_ID,
      pathVariables
    );
  };

  // Colleges CRUD
  addCollege = (payload) => {
    return this.post(ENDPOINT_PATHS.COLLEGES, payload);
  };

  getColleges = (params) => {
    return this.get(ENDPOINT_PATHS.COLLEGES, params);
  };

  editCollege = (payload) => {
    return this.put(ENDPOINT_PATHS.COLLEGES, payload);
  };

  deleteCollege = (pathVariables) => {
    return this.delete(ENDPOINT_PATHS.COLLEGES_BY_ID, pathVariables);
  };

  // Departments APIs
  getDepartments = (params) => {
    return this.get(ENDPOINT_PATHS.COLLEGE_DEPARTMENTS, params);
  };

  // Citizenship APIs
  getCitizenships = (params) => {
    return this.get(ENDPOINT_PATHS.CITIZENSHIPS, params);
  };

  // Users CRUD
  addUser = (payload) => {
    return this.post(ENDPOINT_PATHS.USERS, payload);
  };

  getUsers = (params) => {
    return this.get(ENDPOINT_PATHS.USERS, params);
  };

  editUser = (payload) => {
    return this.put(ENDPOINT_PATHS.USERS, payload);
  };

  deleteUser = (pathVariables) => {
    return this.delete(ENDPOINT_PATHS.USERS_BY_ID, pathVariables);
  };

  authorizeUser = (payload) => {
    return this.post(ENDPOINT_PATHS.AUTHORIZE_USER, payload);
  };

  // Study Programs CRUD
  addStudyProgram = (payload) => {
    return this.post(ENDPOINT_PATHS.STUDY_PROGRAMS, payload);
  };

  getStudyPrograms = (params) => {
    return this.get(ENDPOINT_PATHS.GET_STUDY_PROGRAMS, params);
  };

  editStudyProgram = (payload) => {
    return this.put(ENDPOINT_PATHS.STUDY_PROGRAMS, payload);
  };

  deleteStudyProgram = (pathVariables) => {
    return this.delete(ENDPOINT_PATHS.STUDY_PROGRAMS_BY_ID, pathVariables);
  };

  validateAllSubjects = (pathVariables) => {
    return this.post(ENDPOINT_PATHS.VALIDATE_ALL, {}, {}, pathVariables);
  };

  // Modules CRUD
  addModule = (payload) => {
    return this.post(ENDPOINT_PATHS.MODULES, payload);
  };

  getModules = (params) => {
    return this.get(ENDPOINT_PATHS.GET_MODULES, params);
  };

  editModule = (payload) => {
    return this.put(ENDPOINT_PATHS.MODULES, payload);
  };

  deleteModule = (pathVariables) => {
    return this.delete(ENDPOINT_PATHS.MODULES_BY_ID, pathVariables);
  };

  // Domains CRUD
  addDomain = (payload) => {
    return this.post(ENDPOINT_PATHS.DOMAINS, payload);
  };

  getDomains = (params) => {
    return this.get(ENDPOINT_PATHS.DOMAINS, params);
  };

  editDomain = (payload) => {
    return this.put(ENDPOINT_PATHS.DOMAINS, payload);
  };

  deleteDomain = (pathVariables) => {
    return this.delete(ENDPOINT_PATHS.DOMAINS_BY_ID, pathVariables);
  };

  // Study Groups CRUD
  addStudyGroup = (payload) => {
    return this.post(ENDPOINT_PATHS.STUDY_GROUPS, payload);
  };

  getStudyGroups = (params) => {
    return this.get(ENDPOINT_PATHS.GET_STUDY_GROUPS, params);
  };

  editStudyGroup = (payload) => {
    return this.put(ENDPOINT_PATHS.STUDY_GROUPS, payload);
  };

  deleteStudyGroup = (pathVariables) => {
    return this.delete(ENDPOINT_PATHS.STUDY_GROUPS_BY_ID, pathVariables);
  };

  // University Hours CRUD
  addUniversityHour = (payload) => {
    return this.post(ENDPOINT_PATHS.UNIVERSITY_HOURS, payload);
  };

  getUniversityHours = (params) => {
    return this.get(ENDPOINT_PATHS.GET_UNIVERSITY_HOURS, params);
  };

  getFractions = (params) => {
    return this.get(ENDPOINT_PATHS.GET_FRACTIONS, params);
  };

  editUniversityHour = (payload, params) => {
    return this.post(ENDPOINT_PATHS.EDIT_UNIVERSITY_HOUR, payload, params);
  };

  deleteUniversityHour = (pathVariables) => {
    return this.delete(
      ENDPOINT_PATHS.UNIVERSITY_POSITIONS_BY_ID,
      pathVariables
    );
  };

  // Positions Coverage CRUD
  getPositionsCoverage = (params) => {
    return this.get(ENDPOINT_PATHS.GET_POSITIONS_COVERAGE, params);
  };

  // University Positions CRUD
  addUniversityPosition = (payload) => {
    return this.post(ENDPOINT_PATHS.UNIVERSITY_POSITIONS, payload);
  };

  getUniversityPositions = (params) => {
    return this.get(ENDPOINT_PATHS.GET_UNIVERSITY_POSITIONS, params);
  };

  editUniversityPosition = (payload) => {
    return this.put(ENDPOINT_PATHS.UNIVERSITY_POSITIONS, payload);
  };

  deleteUniversityPosition = (pathVariables) => {
    return this.delete(
      ENDPOINT_PATHS.UNIVERSITY_POSITIONS_BY_ID,
      pathVariables
    );
  };

  // Settings
  getSettings = (params) => {
    return this.get(ENDPOINT_PATHS.MULTIPLIERS_DETAILS, params);
  };

  editSettings = (payload) => {
    return this.put(ENDPOINT_PATHS.SETTINGS, payload);
  };
}

let httpBasedHandler;
const Request = new Proxy(
  { apiHandler },
  {
    get: function (obj, prop) {
      if (prop === "apiHandler") {
        if (!httpBasedHandler) {
          httpBasedHandler = new HttpBasedAPI();
        }

        return httpBasedHandler;
      }

      return obj[prop];
    },
  }
);

export default Request;
