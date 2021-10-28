import {
  ADD_FIRST_FORM,
  ADD_SECOND_FORM,
  CONFIRMED_GET_PROJECTS,
  GET_PROJECTS_FAIL,
  GET_PROJECTS_REQUEST,
  PROJECTS_ADD_REQUEST,
  EDIT_PROJECT_FORM,
} from "../constant/projectConstants";

const initialState = {
  projects: [],
  editData: null,
};

export default function ProjectReducer(
  state = initialState,
  actions,
  loading = false
) {
  switch (actions.type) {
    case GET_PROJECTS_REQUEST:
      return { loading: true };

    case GET_PROJECTS_FAIL:
      return { loading: false };

    case CONFIRMED_GET_PROJECTS:
      return {
        ...state,
        projects: actions.payload,
        loading: false,
      };
    case PROJECTS_ADD_REQUEST:
      return {
        projectAddLoading: true,
      };
    case ADD_FIRST_FORM:
      return {
        ...state,
        projectsFirstForm: actions.payload,
        projectAddLoading: false,
      };

    case ADD_SECOND_FORM:
      return {
        ...state,
        projectsFirstForm: actions.payload,
      };

    case EDIT_PROJECT_FORM:
      return {
        ...state,
        editData: actions.payload,
      };

    default:
      return state;
  }
}
