import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../slices/postSlice';
import '../../styles/stylesheet.scss';


const FeedPosts = props => {
const dispatch = useDispatch();
const posts = useSelector((state) => state.post.posts); //grabbing posts from Redux store
  // test post
  useEffect(() => {
    dispatch(fetchPosts()); //Dispatch the fetch action when component mounts
  }, [dispatch]);

  if(!posts.length) {
    return <div>Loading posts...</div>;
  }

  return (
    <div className='feed'>
      {posts.map((posts) => (
        <div key={posts._id} className='feed-posts'>
          <h4 className='post-title'>{posts.title}</h4><br />
          <span className='post-date'>{posts.dates}</span><br />
          <p>{posts.description}</p>
          {/* button here to message owner of post */}
        </div>
      ))}
    </div>
  );
};

export default FeedPosts;
