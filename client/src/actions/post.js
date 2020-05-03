import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_POSTS,
  POST_ERROR,
  ADD_LIKE,
  REMOVE_LIKE,
  DELETE_POST,
  ADD_POST
} from './types';

//Get all posts
export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/post');
    dispatch({
      type: GET_POSTS,
      payload: res.data
    });
  } catch (err) {
    console.error(err);
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};

//Add a like

export const addLike = (post_id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/post/like/${post_id}`);
    dispatch({
      type: ADD_LIKE,
      payload: { post_id, likes: res.data }
    });
  } catch (err) {
    console.error(err);
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};

//Remove a like

export const removeLike = (post_id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/post/unlike/${post_id}`);
    dispatch({
      type: REMOVE_LIKE,
      payload: { post_id, likes: res.data }
    });
  } catch (err) {
    console.error(err);
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};

//Delete a post

export const deletePost = (post_id) => async (dispatch) => {
  try {
    await axios.delete(`/api/post/${post_id}`);
    dispatch({
      type: DELETE_POST,
      payload: post_id
    });

    dispatch(setAlert('Post Removed', 'success'));
  } catch (err) {
    console.error(err);
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};

// Add a post

export const addPost = (formData) => async (dispatch) => {
  try {
    const config = {
      'Content-Type': 'application/json'
    };
    const res = await axios.post(`/api/post/`, formData, config);
    dispatch({
      type: ADD_POST,
      payload: res.data
    });

    dispatch(setAlert('Post Created', 'success'));
  } catch (err) {
    console.error(err);
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};
