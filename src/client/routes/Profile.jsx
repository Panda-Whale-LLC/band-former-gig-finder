import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { createPost } from '';

import { useNavigate } from 'react-router-dom';
import { useLoaderData } from 'react-router-dom';
import { logout, setCredentials } from '../slices/userSlice';
import '../styles/stylesheet.scss';


const initialData = {
  name: 'Johnny BeGood',
  userName: 'coolMusicMan05',
  // profilephoto_URL: ,
  instrumentation: ['guitar', 'drum', 'singing'],
  location: 'Los Angeles, CA',
  availability: true,
  email: 'coolmusicman05@gmail.com',
  videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ?si=sEplqZQq0T4qaIgt',
  short_bio: 'A cool guy new to the coast looking for people to jam with!',
  // socialmedia_link: '',
};

const Profile = props => {
  const state = useSelector(data => data.user);
  const userToken = state.userToken;
  const userInfo = useLoaderData();
  const [idGood, setIdGood ] = useState(false);

  // pull data from user account to populate profile
  // const userData = useSelector(state => state.userData);
  // console.log('data', data);

  // create post button
  const dispatch = useDispatch();

  // const clicker = () => {
  //   dispatch(createPost(data));
  // };

  // reset userToken to null on logout
  const userLogout = () => {
    dispatch(logout());
    setTimeout(()=>{navigate('/login');}, 2000);
  };

  const navigate = useNavigate();
  const data = useLoaderData();
  console.log('data', data);
  // const profileURL = `./uploads/${data.userName}_profilepicture.jpg`;
 
  // const toFeed = () => {
  //   navigate('/');
  // }  



  const [userData, setData] = useState(initialData);

  const avail = userData.availability ? 'Yes' : 'No';



  return (
    <div className='profile-container'>
      <div>
        <button className="button-87" id='feedButton' onClick={ ()=> navigate('/') }>Feeds</button>
      </div>
      <div className='profileinner'>
        <img src={require(`/uploads/${data.userName}_profilepicture.jpg`)} alt='profile photo' style={{maxHeight:'20vh'}}/>
        <h1 className='username'>{ userInfo.userName }</h1>
        {/* basic info goes here */}


        <div className='pDiv'>
          <div id='pLabel'>Name: </div>{ userInfo.name }
        </div><br />
        <div className='pDiv'>
          <div id='pLabel'>Location: </div>{ userData.location }
        </div><br />
        <div className='pDiv'>
          <div id='pLabel'>Contact Email: </div>{ userData.email }
        </div><br />
        <div className='pDiv'>
          <div id='pLabel'>Bio: </div>{ userData.short_bio }
        </div><br />

        {/* extra info (instruments, music, etc) goes here */}
        <div className='pDiv'>
          <div id='pLabel'>Instrument: </div>{ userInfo.instrumentation.join(', ') }<br />
        </div><br />
        <div className='pDiv'>
          <div id='pLabel'>Available: </div> { avail }<br />
        </div> <br />

        {/* embedded content + social media? */}
        <div className='embedded-content'>
          <div id='pLabel'>Social Media: </div>{ userData.socialmedia_link }<br />
          {/* <video src={ userData.videoURL } /> */}
          <iframe width='560' height='315' src={ userData.videoURL } title='YouTube video player' frameBorder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share' allowFullScreen></iframe>
        </div>
        <button className='button-12' id='logout' onClick={ userLogout }>logout</button>
        {/* <button id='make-post' onClick={ clicker }>make post</button> */}
      </div>
      <div className='formuoli'>
        <iframe name="dummyframe" id="dummyframe" style={{display: 'none'}}></iframe>
        <form action="http://localhost:3000/photo" method="post" encType='multipart/form-data' target="dummyframe">
          <label htmlFor='avatar'>
            
            Would you like to upload your avatar?<br/>
          </label>
          <input type="file" id="avatar" name="avatar" accept='image/*'/>
          <input type="hidden" name={ userInfo.userName } value={ userInfo.userName }/>
          <button id="submitButton" name="submitButton">Submit</button>
        </form>
      </div>
    </div>
  );
};


export default Profile;
