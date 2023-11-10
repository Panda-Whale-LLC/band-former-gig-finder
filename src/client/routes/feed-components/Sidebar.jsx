import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addNewPost } from '../../slices/postSlice'
//import { useLoaderData } from 'react-router-dom';
import { Link } from 'react-router-dom';
// import { useSelector, useDispatch } from "react-redux";
// import { createPost } from '';

const Sidebar = ({ userName, name, userID }) => {
  const dispatch = useDispatch();

  //const userInfo = useSelector((state) => state.user.userInfo);
  //const userInfo = useLoaderData();

  const [form, setForm] = useState({
    title: '',
    dates: '',
    user_id: userID,
    description: '',
  });
//update user_id when user logs in
  // useEffect(() => {
  //   if (userInfo && userInfo._id) {
  //     setForm((form)=> ({ ...form, user_id: userInfo._id }));
  //   }
  // }, [userInfo])

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name] : e.target.value,
    });
  };

  console.log('form:', form)

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addNewPost(form)); // Dispatches the addnewPost action with form data
  };

  // const userName = userInfo.userName;
  // const name =userInfo.name
  // const userID = userInfo._id;
  console.log('USER DATA',userName, name, userID)
  return (
    <div className='sidebar'>
      {/* profile photo goes here if stretch hits */}
      <h2 className='sidebar-username'>{userName}</h2>
      <h4 className='sidebar-name'>{name}</h4>
      <Link className='link' to={`/user/${userID}`}><button className='submitButton'>View Profile</button></Link>

      <form className= 'post-form' onSubmit={handleSubmit}>
        <br />
        <label>
        Title:
        </label>
        <br />
        <input
        className='sidebar-title'
          type='text'
          name='title'
          value={form.title}
          onChange={handleChange}
        >
        </input>
        <br />
        <br />
        <label>
        Dates:
        </label>
        <br />
        <input
        className='sidebar-dates'
          type='text'
          name='dates'
          value={form.dates}
          onChange={handleChange}
        >
        </input>
        <br />
        <br />
        <label>
        Description:
        </label>
        <input
        className='sidebar-description'
          type='text'
          name='description'
          value={form.description}
          onChange={handleChange}
        >
        </input>
        <br />
        <br />
        <button className='submitButton' id='make-post' type='submit'>Submit Post</button>
      </form>

    </div>
  );
};



export default Sidebar;
