import {
  CONFIRMED_GET_PROJECTS,
  GET_PROJECTS_REQUEST,
  GET_PROJECTS_FAIL,
  ADD_FIRST_FORM,
  PROJECTS_ADD_REQUEST,
  ADD_SECOND_FORM,
  EDIT_PROJECT_FORM,
} from "../constant/projectConstants";
import axiosInstance from "../../services/AxiosInstance";
export const getAllProjectsAction = () => async (dispatch, getState) => {
  const {
    auth: { auth },
  } = getState();
  dispatch({
    type: GET_PROJECTS_REQUEST,
  });
  console.log(auth);
  return await new Promise((resolve, reject) => {
    axiosInstance
      .get(`api/buyer/${auth.auth.user.company_name}`)
      .then((response) => {
        if (response.data.responseCode === "00") {
          let allProjects = response.data.project;
          dispatch(confirmedGetProjectAction(allProjects));

          resolve(response);
        }
        reject(response);
      })
      .catch((err) => {
        reject(err);
        dispatch({ type: GET_PROJECTS_FAIL });
      });
  });
};

export const addFirstForm = (values) => (dispatch) => {
  dispatch({
    type: PROJECTS_ADD_REQUEST,
  });
  dispatch({
    type: ADD_FIRST_FORM,
    payload: values,
  });
};

export const addSecondForm = (values) => (dispatch, getState) => {
  const {
    projects: { projectsFirstForm },
    auth: { auth },
  } = getState();

  console.log("actions", auth.user.company_name);
  const projectFormsValues = Object.assign(projectsFirstForm, values);
  projectFormsValues.userId = auth.user._id;
  projectFormsValues.company_name = auth.user.company_name;
  projectFormsValues.unit = "unit";
  // projectFormsValues.image = image;

  axiosInstance
    .post(`api/buyer/addProject/`, projectFormsValues)
    .then((response) => {
      if (response.data.responseCode === "00") {
        //  let addedProjects = response.data;
        dispatch({
          type: ADD_SECOND_FORM,
          payload: projectFormsValues,
        });
      }
    });
  // .catch((err) => {
  //   dispatch({ type: GET_PROJECTS_FAIL });
  // });

  //  dispatch({
  //   type: ADD_SECOND_FORM,
  //   payload: projectFormsValues,
  // });
};

export const onEditSubmit = (values) => (dispatch, getState) => {
  const {
    projects: { projectsFirstForm },
    auth: { auth },
  } = getState();

  const projectFormsValues = Object.assign(projectsFirstForm, values);
  projectFormsValues.userId = auth.user._id;
  projectFormsValues.unit = "unit";
  // projectFormsValues.image = image;

  console.log("editSubmission", projectFormsValues);

  axiosInstance
    .patch(
      `/api/buyer/EditsaveProjectDraft/${projectFormsValues._id}`,
      projectFormsValues
    )
    .then((response) => {
      if (response.data.responseCode === "00") {
        //  let addedProjects = response.data;
        dispatch({
          type: EDIT_PROJECT_FORM,
          payload: response.data.project,
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });

  //  dispatch({
  //   type: ADD_SECOND_FORM,
  //   payload: projectFormsValues,
  // });
};

export const saveAsDraft = (values) => (dispatch, getState) => {
  const {
    projects: { projectsFirstForm },
    auth: { auth },
  } = getState();

  const projectFormsValues = Object.assign(projectsFirstForm, values);
  projectFormsValues.userId = auth.user._id;
  projectFormsValues.unit = "unit";
  // projectFormsValues.image = image;

  console.log("editSubmission", projectFormsValues);

  axiosInstance
    .patch(
      `/api/buyer/saveProjectAsDraft${projectFormsValues._id}`,
      projectFormsValues
    )
    .then((response) => {
      if (response.data.responseCode === "00") {
        //  let addedProjects = response.data;
        dispatch({
          type: EDIT_PROJECT_FORM,
          payload: response.data.project,
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });

  //  dispatch({
  //   type: ADD_SECOND_FORM,
  //   payload: projectFormsValues,
  // });
};

export function confirmedGetProjectAction(allProjects) {
  return {
    type: CONFIRMED_GET_PROJECTS,
    payload: allProjects,
  };
}
