/* eslint-disable linebreak-style */
import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (blogObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, blogObject, config);
  return response.data;
};

const update = async (blogObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.put(
    baseUrl + `/${blogObject.id}`,
    blogObject,
    config
  );
  // console.log('The response from update >> ', response.data)
  return response.data;
};

const remove = async (blogId) => {
  console.log("The id of removed item", blogId);
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.delete(baseUrl + `/${blogId}`, config);
  return response.data;
};

export default {
  getAll,
  create,
  update,
  remove,
  setToken,
};
