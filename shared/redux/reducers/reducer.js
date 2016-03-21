import * as ActionTypes from '../constants/constants';

const initialState = { posts: [], selectedPost: null, coordinates: null };

const postReducer = (state = initialState, action) => {
    switch (action.type) {
    case ActionTypes.UPDATE_LOCATION:
        return {
            coordinates: [action.position.coords.longitude, action.position.coords.latitude],
            posts: [],
            post: state.post
        };
    case ActionTypes.ADD_CHIRP :
        return {
            coordinates: state.coordinates,
            posts: [{
                content: action.content,
                username: action.username,
                cuid: action.cuid,
                _id: action._id,
            }, ...state.posts],
            post: state.post };

    case ActionTypes.CHANGE_SELECTED_POST :
        return {
            coordinates: state.coordinates,
            posts: state.posts,
            post: action.slug,
        };

    case ActionTypes.ADD_POSTS :
        return {
            coordinates: state.coordinates,
            posts: action.posts,
            post: state.post,
        };

    case ActionTypes.ADD_SELECTED_POST :
        return {
            coordinates: state.coordinates,
            post: action.post,
            posts: state.posts,
        };

    default:
        return state;
    }
};

export default postReducer;
