import axios from 'axios';
import { API_BASE_URL, API_URLs } from './Constant';


export const registerUser = async (body) =>{

    const url = `${API_BASE_URL}${API_URLs.REGISTER}`

    //  http://localhost:8080/auth/register
  
    try {
        const response = await axios.post(url, body)
        console.log(response);
        return response.data;
        
    } catch (error) {
        console.error('Error:', error.response || error.message);
        throw error;
    }
}


export const loginUser = async (body) =>{

    const url = `${API_BASE_URL}${API_URLs.Login}`
  
    try {
        const response = await axios.post(url, body)
        console.log(response)
        return response.data;
        
    } catch (error) {
        console.error('Error:', error.response || error.message);
        throw error;
    }
}


export const verifyUserCode= async (body) =>{

    const url = `${API_BASE_URL}${API_URLs.Verify}`
    console.log(body)
  
    try {
        const response = await axios.post(url, body)
        console.log(response)
        return response.data;
        
    } catch (error) {
        console.error('Error:', error.response || error.message);
        throw error;
    }
}

export const confirmPassword= async (body) =>{

    const url = `${API_BASE_URL}${API_URLs.New_Password}`
    console.log(body)
  
    try {
        const response = await axios.post(url, body)
        console.log(response)
        return response.data;
        
    } catch (error) {
        console.error('Error:', error.response || error.message);
        throw error;
    }
}