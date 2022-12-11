const ENDPOINT_PATHS = {
  // Data Import
  IMPORT_DATA: "v1/import/importData",
  DOWNLOAD_TEMPLATE: "v1/import/downloadTemplate",

  // Data Export
  EXPORT_POSITIONS: "v1/export/positionsReport",
  EXPORT_VACANT_POSITIONS: "v1/export/vacantPositionsReport",
  EXPORT_MOODLE_STRUCTURE: "v1/export/moodleStructure",
  EXPORT_MOODLE_SUBJECTS: "v1/export/MoodleSubjects",
  EXPORT_MOODLE_TEACHERS: "v1/export/MoodleTeachers",
  EXPORT_MOODLE_COHORTS: "v1/export/MoodleCohorts",
  EXPORT_MSO_HOURS: "v1/export/MsoHours",
  EXPORT_STUDY_PROGRAMS_SUBJECTS: "v1/export/StudyProgramSubjects",

  // Teachers CRUD
  TEACHERS: "v1/teachers",
  GET_TEACHERS: "v1/teachers/loadData",
  TEACHERS_BY_ID: "v1/teachers/{0}",

  // CollegeDepartmentTeacher CRUD
  DEPARTMENT_TEACHERS_ASSOCIATION: "v1/collegeDepartmentTeacher",
  DEPARTMENT_TEACHERS_ASSOCIATION_BY_ID: "v1/collegeDepartmentTeacher/{0}/{1}",
  GET_DEPARTMENT_TEACHERS_ASSOCIATION: "v1/collegeDepartmentTeacher/loadData",

  // Subjects CRUD
  SUBJECTS: "v1/subjects",
  SUBJECTS_BY_ID: "v1/subjects/{0}",
  GET_SUBJECTS: "v1/subjects/loadData",

  // Optional Subjects List CRUD
  OPTIONAL_SUBJECTS_LIS: "v1/optionalSubjectsList",
  OPTIONAL_SUBJECTS_LIST_BY_ID: "v1/optionalSubjectsList/{0}/{1}/{2}",
  GET_OPTIONAL_SUBJECTS_LIST: "v1/optionalSubjectsList/loadData",

  // Colleges CRUD
  COLLEGES: "v1/colleges",
  COLLEGES_BY_ID: "v1/colleges/{0}",

  // Departments Paths
  COLLEGE_DEPARTMENTS: "v1/collegeDepartments",

  // Citizenship Paths
  CITIZENSHIPS: "v1/citizenships",

  // Users CRUD
  USERS: "v1/users",
  USERS_BY_ID: "v1/users/{0}",
  AUTHORIZE_USER: "v1/users/authorize",

  // Study Programs CRUD
  STUDY_PROGRAMS: "v1/studyPrograms",
  STUDY_PROGRAMS_BY_ID: "v1/studyPrograms/{0}",
  GET_STUDY_PROGRAMS: "v1/studyPrograms/loadData",
  VALIDATE_ALL: "v1/studyPrograms/validateAll/{0}",

  // Modules CRUD
  MODULES: "v1/modules",
  MODULES_BY_ID: "v1/modules/{0}/{1}",
  GET_MODULES: "v1/modules/loadData",

  // Domains CRUD
  DOMAINS: "v1/domains",
  DOMAINS_BY_ID: "v1/domains/{0}",

  // Study Groups CRUD
  STUDY_GROUPS: "v1/studyGroups",
  STUDY_GROUPS_BY_ID: "v1/studyGroups/{0}",
  GET_STUDY_GROUPS: "v1/studyGroups/loadData",

  // University Hours CRUD
  UNIVERSITY_HOURS: "v1/universityHours",
  UNIVERSITY_HOURS_BY_ID: "v1/universityHours/{0}",
  GET_UNIVERSITY_HOURS: "v1/universityHours/loadData",
  EDIT_UNIVERSITY_HOUR: "v1/universityHours/editHour",
  GENERATE_HOURS: "v1/universityHours/generateHours",
  GET_FRACTIONS: "v1/universityHours/getFractions",

  // Positions Coverage CRUD
  POSITIONS_COVERAGE: "v1/positionsCoverage",
  GET_POSITIONS_COVERAGE: "v1/positionsCoverage/loadData",

  // University Positions CRUD
  UNIVERSITY_POSITIONS: "v1/universityPositions",
  UNIVERSITY_POSITIONS_BY_ID: "v1/universityPositions/{0}",
  GET_UNIVERSITY_POSITIONS: "v1/universityPositions/loadData",

  // Multipliers
  MULTIPLIERS_DETAILS: "v1/settings/loadData",
  SETTINGS: "v1/settings",
};

export { ENDPOINT_PATHS };
