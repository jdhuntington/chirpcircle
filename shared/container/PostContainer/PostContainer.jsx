import React, { PropTypes, Component } from 'react';
import PostListView from '../PostListView/PostListView';
import ChirpMap from '../ChirpMap/ChirpMap';
import PostCreateView from '../../components/PostCreateView/PostCreateView';
import CreateChirp from '../../components/CreateChirp/CreateChirp';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { connect } from 'react-redux';
import * as Actions from '../../redux/actions/actions';

class PostContainer extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      showAddPost: true,
    };
    this.handleClick = this.handleClick.bind(this);
    this.add = this.add.bind(this);
    this.addChirp = this.addChirp.bind(this);
  }

  handleClick(e) {
    this.setState({
      showAddPost: !this.state.showAddPost,
    });

    e.preventDefault();
  }

  add(name, title, content) {
    this.props.dispatch(Actions.addPostRequest({ name, title, content }));
    this.setState({
      showAddPost: false,
    });
  }

  addChirp(username, content) {
    this.props.dispatch(Actions.addChirpRequest({ username, content }));
  }

  componentDidMount() {
    if(this.props.posts.length === 0) {
      this.props.dispatch(Actions.fetchPosts());
    }
  }

    render() {
    return (
      <div>
        <Header onClick={this.handleClick} />
        <section className="section">
        <div className="container">
        <div className="columns">
        <div className="column">
        <ChirpMap posts={this.props.posts} currentLocation={this.props.coordinates} />
        <PostListView posts={this.props.posts}/>
        </div>
        <div className="column">
        <CreateChirp addChirp={this.addChirp} />
        </div>
        </div>
        </div>
        </section>
        <Footer />
      </div>
    );
  }
}

PostContainer.need = [() => { return Actions.fetchPosts(); }];
PostContainer.contextTypes = {
  router: React.PropTypes.object,
};

function mapStateToProps(store) {
  return {
    posts: store.posts,
    coordinates: store.coordinates
  };
}

PostContainer.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  })).isRequired,
  dispatch: PropTypes.func.isRequired,
  coordinates: PropTypes.array.isRequired
};

export default connect(mapStateToProps)(PostContainer);
