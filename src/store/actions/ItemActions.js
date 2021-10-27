import {
  CONFIRMED_GET_PROJECTS,
  GET_PROJECTS_REQUEST,
  GET_PROJECTS_FAIL,
  ADD_FIRST_FORM,
  PROJECTS_ADD_REQUEST,
  ADD_SECOND_FORM,
} from "../constant/itemConstants";
import axiosInstance from "../../services/AxiosInstance";

export const getAllItemsAction = () => async (dispatch, getState) => {
  const {
    auth: { auth },
  } = getState();
  dispatch({
    type: GET_PROJECTS_REQUEST,
  });
  return await new Promise((resolve, reject) => {
    axiosInstance
      .get(`api/buyer/${auth.user._id}`)
      .then((response) => {
        if (response.data.responseCode === "00") {
          let allItems = response.data.project;
          dispatch(confirmedGetItemAction(allItems));

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

export const addFirstForm = (values)=> (dispatch) => {
  
  dispatch({
    type: PROJECTS_ADD_REQUEST,
  });
  dispatch({
    type: ADD_FIRST_FORM,
    payload: values,
  });

};

export const addSecondForm = (values)=> (dispatch, getState) => {
  const {
    Items: { ItemsFirstForm },
    auth: { auth },
  } = getState();
   
  const ItemFormsValues = Object.assign(ItemsFirstForm, values);
  ItemFormsValues.userId = auth.user._id;
  ItemFormsValues.unit = "unit";
  // projectFormsValues.image = image;
  

    axiosInstance
    .post(`api/buyer/addProject`, ItemFormsValues)
    .then((response) => {
      if (response.data.responseCode === "00") {
      //  let addedItems = response.data;
        dispatch({
           type: ADD_SECOND_FORM,
           payload: ItemFormsValues,
        });
      }
    })
    // .catch((err) => {
    //   dispatch({ type: GET_ItemS_FAIL });
    // });

  //  dispatch({
  //   type: ADD_SECOND_FORM,
  //   payload: ItemFormsValues,
  // });
};

export function confirmedGetItemAction(allItems) {
  return {
    type: CONFIRMED_GET_PROJECTS,
    payload: allItems,
  };
}
