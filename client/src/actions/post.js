import axios from 'axios';
import {
  GET_POSTS,
  POST_ERROR,
  ADD_LIKE,
  REMOVE_LIKE,
  DELETE_POST
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

