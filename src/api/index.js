import axios from 'axios';
// https://blue-hill-forums.herokuapp.com/
// const API = axios.create({baseURL:'http://localhost:5000'})
const API = axios.create({baseURL:'https://blue-hill-forums.herokuapp.com/'})

//get token from local storage & send to backend on api calls for auth
API.interceptors.request.use((req) => {
    if(localStorage.getItem('user')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('user')).token}`;
    }
    return req;
}); //before any request slap this in the header


export const createPost = (newPost) => API.post('/posts', newPost)
export const fetchPost = (id) => API.get(`/posts/${id}`)
export const fetchPosts = (page) => API.get(`/posts?page=${page}`)
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost)
export const deletePost = (id) => API.delete(`/posts/${id}`)


export const likePost = (id) => API.patch(`/posts/${id}/likePost`)
export const commentPost = (comment, id) => API.post(`/posts/${id}/commentPost`,{comment})


export const login = (formData) => API.post('/user/login',formData);
export const register = (formData) => API.post('/user/register',formData);

export const fetchPostsFromUserId = (userId) => API.get(`/posts/profile/${userId}`)