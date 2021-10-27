import {
  ADD_FIRST_FORM,
  ADD_SECOND_FORM,
  CONFIRMED_GET_PROJECTS,
  GET_PROJECTS_FAIL,
  GET_PROJECTS_REQUEST,
  PROJECTS_ADD_REQUEST,
} from "../constant/itemConstants";

const initialState = {
  Items: [],
};

export default function ItemReducer(
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
        Items: actions.payload,
        loading: false,
      };
    case PROJECTS_ADD_REQUEST:
      return {
        ItemAddLoading: true,
      };
    case ADD_FIRST_FORM:
      return {
        ...state,
        ItemsFirstForm: actions.payload,
        ItemAddLoading: false,
      };

    case ADD_SECOND_FORM:
      return {
        ...state,
         
        ItemsFirstForm: actions.payload,
      };

    default:
      return state;
  }
}
