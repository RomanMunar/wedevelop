import React, { useEffect, Fragment } from 'react';
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPost } from '../../actions/post';

const Post = ({ getPost, post: { post, loading }, match }) => {
  useEffect(() => {
    getPost(match.params.id);
    console.log(match.params.id)
  }, [getPost, match.params.id]);
  return <Fragment>
    <Link to='/posts'className='btn'>
      Back To Posts
    </Link>
  </Fragment>;
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
  post: state.post
});
export default connect(mapStateToProps, { getPost })(Post);
