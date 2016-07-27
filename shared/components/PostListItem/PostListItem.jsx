import React, { PropTypes } from 'react';
import { Link } from 'react-router';

function PostListItem(props) {
    return (
        <article className="media">
        <div className="media-content">
        <div className="content">
        <p className="author-name">By {props.post.username}</p>
        <p className="post-desc">{props.post.content}</p>
        </div>
        </div>
        </article>
    );
}

PostListItem.propTypes = {
    post: PropTypes.shape({
        content: PropTypes.string.isRequired,
        cuid: PropTypes.string.isRequired,
    }).isRequired,

    onClick: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default PostListItem;
