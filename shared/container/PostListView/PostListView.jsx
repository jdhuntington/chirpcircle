import React, { PropTypes } from 'react';
import PostListItem from '../../components/PostListItem/PostListItem';
import { connect } from 'react-redux';
import * as Actions from '../../redux/actions/actions';

function PostListView(props) {
  var results = [];
  if(props && props.posts) {
  results =  props.posts.map((post, i) => (
          <PostListItem post={post} key={i}
          onClick={function handleClick() {
            props.dispatch(Actions.addSelectedPost(post));
          }}
        />
        ))

  }

  return (
    <div className="listView">
      {results}
    </div>
  );
}

PostListView.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  })).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(PostListView);
