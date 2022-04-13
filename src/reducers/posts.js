import { 
    CREATE, 
    FETCH_ALL, 
    FETCH_POST, 
    UPDATE, 
    DELETE,
    LIKE, 
    COMMENT,
    START_LOADING,
    END_LOADING, 
    FETCH_BY_SEARCH, 
    FETCH_BY_USERID
} from '../constants/actionTypes';

const initalState = {
    isLoading: true, 
    posts: []
}

export default (state = initalState, action) => {
    switch (action.type) {
        case START_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case END_LOADING:
            return {
                ...state,
                isLoading: false
            };
        case FETCH_ALL:
            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                totalNumberOfPages: action.payload.totalNumberOfPages
            };
        case FETCH_POST:
            return {
                ...state,
                post: action.payload
            };
        case FETCH_BY_USERID:
            return {
                ...state,
                posts: action.payload.posts,
            }
        case CREATE:
            return {
                ...state, 
                posts: [...state.posts, action.payload]
            };
        case LIKE: 
            return {
                ...state, 
                posts: state.posts.map((post) => 
                    post._id === action.payload._id ? action.payload : post)
            };
        case UPDATE:
            return {
                ...state, 
                posts: state.posts.map((post) => 
                    post._id === action.payload._id ? action.payload : post)
            };
        case DELETE:
            return {
                ...state, 
                posts: state.posts.filter((post) => 
                    post._id !== action.payload)
            };
        case COMMENT:
            return {
                ...state,
                posts: state.posts.map((post) => {
                    //want to do: 
                    //return all the other posts normally 
                    //change the post that just received a comment
                    
                    if(post._id === action.payload._id){ //change the post that just received a comment
                        //this is our post that just received a comment
                        return action.payload;
                    }

                    //return all the other posts normally 
                    return post;
                })
            };
        default:
            return state;
    }
}