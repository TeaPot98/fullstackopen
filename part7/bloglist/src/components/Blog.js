/* eslint-disable linebreak-style */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText
} from '@mui/material'
// import blogService from '../services/blogs'

const Blog = ({ blogId }) => {
  const blog = useSelector(state => state.blogs.find(b => b.id === blogId))

  console.log("The blog structure >>>", blog);

  return (
    <List className="blog">
      <ListItem disablePadding>
        <ListItemButton component='a' href={`/blogs/${blog.id}`}>
            <ListItemText primary={`${blog.title} ${blog.author}`}/>
        </ListItemButton>
      </ListItem>
    </List>
  );
};

export default Blog;
