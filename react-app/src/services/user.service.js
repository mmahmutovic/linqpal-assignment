import axios from 'axios';

export const addUser = async(data) =>{
   return await axios.post('http://localhost:4000/addUser',data);
};

export const login = async (data) => {
   return await axios.post('http://localhost:4000/login',data);    
};

export const getAllExternalUsers = async () => {
    return await axios.get('http://localhost:4000/');
};
