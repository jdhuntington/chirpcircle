import * as ActionTypes from '../constants/constants';

const initialState = { posts: [], selectedPost: null };

const postReducer = (state = initialState, action) => {
    switch (action.type) {
    case ActionTypes.ADD_CHIRP :
        return {
            posts: [{
                content: action.content,
                username: action.username,
                cuid: action.cuid,
                _id: action._id,
            }, ...state.posts],
            post: state.post };

    case ActionTypes.CHANGE_SELECTED_POST :
        return {
            posts: state.posts,
            post: action.slug,
        };

    case ActionTypes.ADD_POSTS :
        return {
            posts: action.posts,
            post: state.post,
        };

    case ActionTypes.ADD_SELECTED_POST :
        return {
            post: action.post,
            posts: state.posts,
        };

    default:
        return state;
    }
};

export default postReducer;
