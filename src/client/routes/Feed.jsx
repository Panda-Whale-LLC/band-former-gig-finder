import React, { useEffect, useState } from 'react';
import FeedPosts from './feed-components/FeedPosts.jsx';
import Sidebar from './feed-components/Sidebar.jsx';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { logout, setCredentials } from '../slices/userSlice';

import '../styles/stylesheet.scss';

const Feed = props => {

  const [posts, setPosts] = useState([]);
  const [idGood, setIdGood ] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // test data for feed posts:
  const state = useSelector(data => data.user);
  const userToken = state.userToken;
  const userInfo = state.userInfo;

  console.log('state:', state)

  useEffect(() =>{
    const fetchData = async(endPoint, body) => {
      const resp = await fetch(endPoint, body);
      const outcome = await resp.json();
      return outcome;
    };

    if (userToken) {
      
      fetchData('/users/verify', {
        method: "POST",
        headers: {"Content-Type": "application/json",},
        mode: "no-cors",
        body: JSON.stringify({token: userToken})
      })
        .then(outcome => {
          if (outcome.success) {
            console.log('outcome success!')
            setIdGood(true);
            
          } else {
            console.log('failure', outcome)
            dispatch(logout());
            //navigate('/login');
          }
        })
        .catch(err => {
          console.log('err', err)
          dispatch(logout());
          //navigate('/login');
        });
    } else {
      navigate('/login');
    }
  },[userToken]);

  useEffect(()=>{
    const fetchData = async(endPoint, body) => {
      const resp = await fetch(endPoint, body);
      const outcome = await resp.json();
      return outcome;
    };
    console.log('this useffec t')
    fetchData('/users/profile', {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({token: userToken}),
      mode: "no-cors",
    })
    .then(data => {
      console.log('We have user data!:', data);
      dispatch(setCredentials(data))
    })
    .catch(err=> {
      console.log('error', err)
    })
  },[]);

  useEffect(() => {
    fetch('/posts/')
      .then((res) => res.json())
      .then((posts) => {
        console.log('Fetched All Posts:', posts);
        setPosts(posts);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log('USER INFO:', userInfo)
  return (
    <div id='feed-wrap-container'>
      <div id='feed-inner'>
        {/* FeedPosts should fetch and display posts on its own */}
        <FeedPosts />
      </div>
      <div id='sidebar'>
         <Sidebar userName={userInfo.userName} name={userInfo.name} userID={userInfo.id} />
      </div>
    </div>
  );
};

export default Feed;
