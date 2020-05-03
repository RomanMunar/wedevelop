import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import PostItem from '../posts/PostItem';
import CommentItem from './CommentItem';
import CommentForm from '../post/CommentForm';
import { connect } from 'react-redux';
import { getPost } from '../../actions/post';

const Post = ({ getPost, post: { post, loading }, match, isAuthenticated }) => {
  useEffect(() => {
    getPost(match.params.id);
    console.log(match.params.id);
  }, [getPost, match.params.id]);
  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to="/posts" className="btn">
        Back To Posts
      </Link>
      <PostItem post={post} showActions={false} />
      {isAuthenticated == true ? (
        <CommentForm postId={post._id} />
      ) : (
        <Fragment>
          <Link To="/register">Signup</Link>{' or '}
          <Link To="/login">Login</Link> to post a comment
        </Fragment>
      )}
      <div className="comments">
        {post.comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} postId={post._id} />
        ))}
      </div>
    </Fragment>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  isAuthenticated:PropTypes.bool.isRequired,
};
const mapStateToProps = (state) => ({
  post: state.post,
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { getPost })(Post);
