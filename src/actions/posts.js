import { FETCH_BY_USERID,LIKE, FETCH_POST,END_LOADING,START_LOADING,FETCH_BY_SEARCH, FETCH_ALL, CREATE, UPDATE, DELETE, COMMENT } from '../constants/actionTypes';
import * as api from '../api';

export const getPosts = (page) => async (dispatch) => {
    try {
        dispatch({type: START_LOADING})
        const {data} = await api.fetchPosts(page);
        //now we changed our payload. instead of only holding data(posts)
        //it contains an object now, posts, currPage, total#pages on fetch_all
        dispatch({type: FETCH_ALL, payload: data});
        dispatch({type: END_LOADING})
    } catch (error) {
        console.log(error);
    }
}

export const getPost = (id) => async (dispatch) => {
    try {
        dispatch({type: START_LOADING})
        const {data} = await api.fetchPost(id);
        dispatch({type: FETCH_POST, payload: data});
        dispatch({type: END_LOADING})
    } catch (error) {
        const errorData = error.response.data.message
        console.log(errorData)
        dispatch({type: END_LOADING})
    }
}

export const getPostsFromUserId = (userId,setErrorMsg) => async (dispatch) => {
    try {
        dispatch({type: START_LOADING})
        const {data} = await api.fetchPostsFromUserId(userId)
        if(!data){
            setErrorMsg(true)
        }else{
            dispatch({type: FETCH_BY_USERID, payload: data});
            dispatch({type: END_LOADING})
        }

    } catch (error) {
        setErrorMsg(true)
        dispatch({type: END_LOADING})
        console.log(error)
    }
}

export const createPost = (post, navigate) => async (dispatch) => {
    try {
        //console.log(post)
        dispatch({type: START_LOADING})
        const {data} = await api.createPost(post);
        dispatch({type: END_LOADING})
        dispatch({type: CREATE, payload: data})
        navigate(`/posts/${data._id}`) //send user to newly created post
    } catch (error) {
        console.log(error);
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const {data} = await api.updatePost(id,post);
        dispatch({type: UPDATE, payload: data})
        //console.log(data)
    } catch (error) {
        console.log(error);
    }
}

export const deletePost = (id, navigate) => async (dispatch) => {
    try {
        await api.deletePost(id);
        dispatch({type: DELETE, payload: id})
        navigate('/posts')
    } catch (error) {
        console.log(error)
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const {data} = await api.likePost(id);
        // console.log(data)
        dispatch({type: LIKE, payload: data})
    } catch (error) {
        console.log(error)
    }
}

export const commentPost = (comment, id) => async (dispatch) => {
    try {
        const {data} = await api.commentPost(comment, id);
        //console.log(data)
        dispatch({type: COMMENT, payload: data})
        return data.comments; //return the updated comments & then it gets set in state
    } catch (error) {
        console.log(error)
    }
}

