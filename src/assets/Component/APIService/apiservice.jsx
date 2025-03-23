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

export const getDocument = async (token)=>{

    const url = `${API_BASE_URL}${API_URLs.GETDOC}`

    console.log(url)

    try{

        const response = await axios .get(url,
            {headers:
                {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            }
        )
        console.log(response);
        return response.data;

    } catch(error){
        console.error('Error:', error.response || error.message);
        throw error;
    }

}

export const getAllTraining = async (token) =>{

    const url = `${API_BASE_URL}${API_URLs.GETTRAINING}`


    console.log("Fetching Training Data from:", url); // Debugging

    console.log(token)

    try{

        const response = await axios .get(url,
            {headers:
                {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            }
        );

        console.log(response);
        return response.data;

    }catch(error){
        console.error('Error:', error.response || error.message);
        return [];
    }

}


export const getEmployeeDetailsById = async (empId , token )=>{

    let url = `${API_BASE_URL}${API_URLs.GETEMPDETAILS}/${empId}`

    console.log(url);
    console.log(token);

    try{
        const response = await axios .get(url,
            {headers:
                {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            }
         );
         return response.data;
    }
    catch(error){
        console.error('Error:', error.response || error.message);
        return [];
    }
}

export const getEmployeesList = async (token) =>{
   
    const url = `${API_BASE_URL}${API_URLs.GETEMPLIST}`

    console.log(url);
    console.log(token);

    try{
        const response = await axios .get(url,
            {headers:
                {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            }
         );
         return response.data;

    }catch(error){
        console.error('Error:', error.response || error.message);
        return [];
    }
}

