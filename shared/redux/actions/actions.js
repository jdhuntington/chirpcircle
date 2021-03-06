import * as ActionTypes from '../constants/constants';
import fetch from 'isomorphic-fetch';

const baseURL = typeof window === 'undefined' ? process.env.BASE_URL || (`http://localhost:${(process.env.PORT || 8000)}`) : '';

export function addPost(post) {
    return {
        type: ActionTypes.ADD_POST,
        name: post.name,
        title: post.title,
        content: post.content,
        slug: post.slug,
        cuid: post.cuid,
        _id: post._id,
    };
}

export function addChirp(chirp) {
    return {
        type: ActionTypes.ADD_CHIRP,
        content: chirp.content,
        username: chirp.username,
        cuid: chirp.cuid,
        loc: chirp.loc,
        _id: chirp._id,
    };
}

export function changeSelectedPost(slug) {
    return {
        type: ActionTypes.CHANGE_SELECTED_POST,
        slug,
    };
}

export function updateLocation(position) {
    return {
        type: ActionTypes.UPDATE_LOCATION,
        position: position
    };
}

export function loadNearbyChirps() {
    return (dispatch, getState) => {
        var coordinates = getState().coordinates;
        return fetch(`${baseURL}/chirp-api/getNearbyChirps?lng=${coordinates[0]}&lat=${coordinates[1]}`).
            then((response) => response.json()).
            then((response) => dispatch(addPosts(response.chirps)));
    };
}

export function addPostRequest(post) {
    return (dispatch) => {
        fetch(`${baseURL}/api/addPost`, {
            method: 'post',
            body: JSON.stringify({
                post: {
                    name: post.name,
                    title: post.title,
                    content: post.content,
                },
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
        }).then((res) => res.json()).then(res => dispatch(addPost(res.post)));
    };
}

export function addChirpRequest(chirp) {
    return (dispatch, getState) => {
        var coordinates = getState().coordinates;
        fetch(`${baseURL}/chirp-api/addChirp`, {
            method: 'post',
            body: JSON.stringify({
                chirp: {
                    content: chirp.content,
                    username: chirp.username,
                    loc: { coordinates: coordinates }
                },
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
        }).then((res) => res.json()).then(res => dispatch(addChirp(res.chirp)));
    };
}

export function addSelectedPost(post) {
    return {
        type: ActionTypes.ADD_SELECTED_POST,
        post,
    };
}

export function getPostRequest(post) {
    return (dispatch) => {
        return fetch(`${baseURL}/api/getPost?slug=${post}`, {
            method: 'get',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
        }).then((response) => response.json()).then(res => dispatch(addSelectedPost(res.post)));
    };
}

export function deletePost(post) {
    return {
        type: ActionTypes.DELETE_POST,
        post,
    };
}

export function addPosts(posts) {
    return {
        type: ActionTypes.ADD_POSTS,
        posts,
    };
}

export function fetchPosts() {
    return (dispatch) => {
        return fetch(`${baseURL}/chirp-api/getChirps`).
            then((response) => response.json()).
            then((response) => dispatch(addPosts(response.chirps)));
    };
}

export function deletePostRequest(post) {
    return (dispatch) => {
        fetch(`${baseURL}/api/deletePost`, {
            method: 'post',
            body: JSON.stringify({
                postId: post._id,
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
        }).then(() => dispatch(deletePost(post)));
    };
}
