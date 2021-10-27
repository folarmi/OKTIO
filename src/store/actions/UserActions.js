import {
  //   createPost,
  // formatPosts,
  getUsers,
  //   deletePost,
  //   updatePost,
} from "../../services/userServices";
import {
  //   CONFIRMED_CREATE_POST_ACTION,
  //   CONFIRMED_DELETE_POST_ACTION,
  //   CONFIRMED_EDIT_POST_ACTION,
  CONFIRMED_GET_USERS,
} from "../constant/userConstant";

// export function deletePostAction(postId, history) {
//   return (dispatch, getState) => {
//     deletePost(postId).then((response) => {
//       dispatch(confirmedDeletePostAction(postId));
//       history.push("/posts");
//     });
//   };
// }

// export function confirmedDeletePostAction(postId) {
//   return {
//     type: CONFIRMED_DELETE_POST_ACTION,
//     payload: postId,
//   };
// }

// export function createPostAction(postData, history) {
//   return (dispatch, getState) => {
//     createPost(postData).then((response) => {
//       const singlePost = {
//         ...postData,
//         id: response.data.name,
//       };
//       dispatch(confirmedCreatePostAction(singlePost));
//       history.push("/posts");
//     });
//   };
// }

export function getUserAction() {
  return (dispatch, getState) => {
    getUsers().then((response) => {
      //   let posts = formatPosts(response.data);
      let users = response.data;
      dispatch(confirmedGetPostsAction(users));
    });
  };
}

// export function confirmedCreatePostAction(singlePost) {
//   return {
//     type: CONFIRMED_CREATE_POST_ACTION,
//     payload: singlePost,
//   };
// }

export function confirmedGetPostsAction(users) {
  return {
    type: CONFIRMED_GET_USERS,
    payload: users,
  };
}

// export function confirmedUpdatePostAction(post) {
//   return {
//     type: CONFIRMED_EDIT_POST_ACTION,
//     payload: post,
//   };
// }

// export function updatePostAction(post, history) {
//   return (dispatch, getState) => {
//     updatePost(post, post.id).then((reponse) => {
//       dispatch(confirmedUpdatePostAction(post));
//       history.push("/posts");
//     });
//   };
// }
