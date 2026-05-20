import {
useEffect,
useState,
} from 'react';

import axiosInstance from '../axiosConfig';

import TaskForm from '../components/TaskForm';

import TaskList from '../components/TaskList';

import { useAuth }
from '../context/AuthContext';

const Tasks = () => {

const { user } =
useAuth();

const [tasks,
setTasks] =
useState([]);

useEffect(() => {

const fetchPlaylists =
async () => {

try {

const response =
await axiosInstance.get(

'/api/playlists',

{
headers: {

Authorization:
`Bearer ${user.token}`,

},

}

);

setTasks(
response.data
);

}

catch {

alert(
'Failed to fetch playlists'
);

}

};

if(user){

fetchPlaylists();

}

}, [user]);

return (

<div className="container mx-auto p-6">

<TaskForm
playlists={tasks}
setPlaylists={setTasks}
/>

<TaskList
tasks={tasks}
setTasks={setTasks}
/>

</div>

);

};

export default Tasks;