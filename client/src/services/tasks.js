import axios from "axios";

const serverUrl = "http://localhost:3001";

//tasks services
const task_getAll = () => {
  const req = axios.get(`${serverUrl}/api/tasks/get`);
  return req.then((res) => res.data);
};

const task_getByFolderId = (id) => {
  const req = axios.get(`${serverUrl}/api/tasks/get/${id}`);
  return req.then((res) => res.data);
};

const task_add = (newTask) => {
  const req = axios.post(`${serverUrl}/api/tasks/insert`, newTask);
  return req.then((res) => res.data);
};

const task_edit = (id, editName) => {
  const req = axios.put(`${serverUrl}/api/tasks/update/${id}/${editName}`);
  return req.then((res) => res.data);
};

const task_delete = (id) => {
  const req = axios.delete(`${serverUrl}/api/tasks/delete/${id}`);
  return req.then((res) => res.data);
};

const task_complete = (id, complete) => {
  const req = axios.put(`${serverUrl}/api/tasks/update/complete/${id}/${complete}`);
  return req.then((res) => res.data);
};

//folder services

const folder_getAll = () => {
  const req = axios.get(`${serverUrl}/api/folders/get`);
  return req.then((res) => res.data);
};

const folder_add = (newFolder) => {
  const req = axios.post(`${serverUrl}/api/folders/insert`, newFolder);
  return req.then((res) => res.data);
};

const folder_delete = (id) => {
  const req = axios.delete(`${serverUrl}/api/folders/delete/${id}`);
  return req.then((res) => res.data);
};

//login service
const login = (username, password) => {
  const req = axios.get(`${serverUrl}/login/${username}/${password}`);
  return req.then((res) => res.data);
};

export default { task_getByFolderId, task_add, task_edit, task_delete, task_getAll, task_complete, folder_getAll, folder_add, folder_delete, login };
