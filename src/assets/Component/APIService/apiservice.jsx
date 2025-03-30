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
    console.log(token)

    try{

        const response = await axios .get(url,
            {headers:
                {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            }
        )

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
export const createEmployee = async (employeeData, token) => {
    const url = `${API_BASE_URL}${API_URLs.CREATEEMP}`;
    try {
        const response = await axios.post(url, employeeData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error creating employee:", error.response || error.message);
        throw error;
    }
};
export const updateEmployee = async (empId, employeeData, token) => {
    const url = `${API_BASE_URL}${API_URLs.UPDATEEMP}/${empId}`;
    try {
        const response = await axios.put(url, employeeData, {
            headers: {
                Authorization:` Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error updating employee:", error.response || error.message);
        throw error;
    }
};
export const deleteEmployee = async (empId, token) => {
    const url = `${API_BASE_URL}${API_URLs.DELETEEMP}/${empId}`;
    try {
        const response = await axios.delete(url, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error deleting employee:", error.response || error.message);
        throw error;
    }
};
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
export const getEmployeesCount = async(token) =>{

    const url = `${API_BASE_URL}${API_URLs.EMPCOUNT}`

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
export const getEmployeesCountByDepartment = async(token) =>{

    const url = `${API_BASE_URL}${API_URLs.EMPCOUNTBYDEPARTMENT}`

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
export const getProjectAndClientCount = async(token) =>{

    const url = `${API_BASE_URL}${API_URLs.GETTOTALCOUNT}`

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
export const getEmployeeDetails = async(empId,token) =>{

    const url = `${API_BASE_URL}${API_URLs.Get_EMP_DashBoard_Details}/${empId}`
    // console.log(url);
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

export const getEmployeeDashboardDetails = async(empId,token) =>{

    const url = `${API_BASE_URL}${API_URLs.Get_HR_Dashboard_Details}/${empId}`
    // console.log(url);
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
export const sendSupportRequest = async (body, token) => {

    const url = `${API_BASE_URL}${API_URLs.Support}`;
   
    console.log(body);
    try {
        const response = await axios.post(url,body,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error:", error.response?.data || error.message);
        throw error;
     }
}
export const sendDocument = async (body,token)=>{

    const url = `${API_BASE_URL}${API_URLs.SENDDOC}`;

    console.log(body);
    console.log(url);
    console.log(token);

    // try{

    //     const response = await axios .get(url,
    //         {headers:
    //             {
    //                 Authorization: `Bearer ${token}`,
    //                 "Content-Type": "application/json",
    //             }
    //         }
    //     )
    //     console.log(response);
    //     return response.data;

    // } catch(error){
    //     console.error('Error:', error.response || error.message);
    //     throw error;
    // }

}
export const punchIn = async (token,empId)=>{

    const url = `${API_BASE_URL}${API_URLs.Punch_In}/${empId}`;
    console.log(url);
    // console.log(token);
    // console.log(empId);

    try{

        const response = await axios .post(url,{},
            {headers:
                {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            }
        )
        // console.log(response);
        return response.data;

    } catch(error){
        console.error('Error:', error.response || error.message);
        throw error;
    }

}
export const punchOut = async (token,empId)=>{

    const url = `${API_BASE_URL}${API_URLs.Punch_Out}/${empId}`;
    console.log(url);
    console.log(token);
    // console.log(empId);

    try{

        const response = await axios .post(url,{},
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
        throw error;
    }

}
export const getLeaveCount = async (empId,token)=>{

    const url = `${API_BASE_URL}${API_URLs.Leave_Count}/${empId}`;
    console.log(url);
    console.log(token);
    // console.log(empId);

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
        throw error;
    }

}
export const addRole = async (roleData, token) => {
    const url = `${API_BASE_URL}${API_URLs.ADDROLE}`;
    try {
      const response = await axios.post(url, roleData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error adding role:', error.response || error.message);
      throw error;
    }
};
export const updateRole = async (updateData) => {
    const url = `${API_BASE_URL}${API_URLs.EDITROLE}`;
    try {
      const response = await axios.put(url, updateData);
      return response.data;
    } catch (error) {
      console.error('Error updating role:', error.response || error.message);
      throw error;
    }
};
export const getPayslip = async (token,year, month) => {
    const url = `${API_BASE_URL}${API_URLs.GETPAYROLLPAYSLIP}/${empId}/${year}/${month}`
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
export const getAttendanceList = async (token)=>{

    const url = `${API_BASE_URL}${API_URLs.Attendance_list}`
    console.log(token)

    try{

        const response = await axios .get(url,
            {headers:
                {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            }
        )

        return response.data;

    } catch(error){
        console.error('Error:', error.response || error.message);
        throw error;
    }

}
export const getAttendanceListById = async (token, empId)=>{

    const url = `${API_BASE_URL}${API_URLs.Attendance_list}/${empId}`
    console.log(token)

    try{

        const response = await axios .get(url,
            {headers:
                {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            }
        )

        return response.data;

    } catch(error){
        console.error('Error:', error.response || error.message);
        throw error;
    }

}

export const getLeaveById = async (token, empId)=>{

    const url = `${API_BASE_URL}${API_URLs.EMP_Leave_list}/${empId}`
    // console.log(token)

    try{

        const response = await axios .get(url,
            {headers:
                {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            }
        )

        return response.data;

    } catch(error){
        console.error('Error:', error.response || error.message);
        throw error;
    }

}

export const getLeaveList = async (token)=>{

    const url = `${API_BASE_URL}${API_URLs.EMP_Leave_list}`
    // console.log(token)

    try{

        const response = await axios .get(url,
            {headers:
                {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            }
        )

        return response.data;

    } catch(error){
        console.error('Error:', error.response || error.message);
        throw error;
    }

}
export const updateBasicInfo = async (token, body, empId)=>{

    const url = `${API_BASE_URL}${API_URLs.Update_bank_Info}/${empId}`
    // console.log(token)

    try{

        const response = await axios .put(url,body,
            {headers:
                {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            }
        )

        return response.data;

    } catch(error){
        console.error('Error:', error.response || error.message);
        throw error;
    }

}
export const updateEducationInfo = async (token, body, empId)=>{

    const url = `${API_BASE_URL}${API_URLs.Update_education_Info}/${empId}`
    // console.log(token)

    try{

        const response = await axios .put(url,body,
            {headers:
                {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            }
        )

        return response.data;

    } catch(error){
        console.error('Error:', error.response || error.message);
        throw error;
    }

}
export const updateExperienceInfo = async (token, body, empId)=>{

    const url = `${API_BASE_URL}${API_URLs.Update_experience_Info}/${empId}`
    // console.log(token)

    try{

        const response = await axios .put(url,body,
            {headers:
                {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            }
        )

        return response.data;

    } catch(error){
        console.error('Error:', error.response || error.message);
        throw error;
    }

}
export const updateFamilyInfo = async (token, body, empId)=>{

    const url = `${API_BASE_URL}${API_URLs.Update_family_Info}/${empId}`
    // console.log(token)

    try{

        const response = await axios .put(url,body,
            {headers:
                {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            }
        )

        return response.data;

    } catch(error){
        console.error('Error:', error.response || error.message);
        throw error;
    }

}
export const getUserList = async ()=>{

    const url = `${API_BASE_URL}${API_URLs.User_List}`
    // console.log(token)

    try{

        const response = await axios .get(url)

        return response.data;

    } catch(error){
        console.error('Error:', error.response || error.message);
        throw error;
    }

}
export const updateLeaveStatus = async (token, body, id, empId)=>{

    const url = `${API_BASE_URL}${API_URLs.update_leave}/${empId}/${id}/status`
    console.log(url);

    try{

        const response = await axios .put(url,body,
            {headers:
                {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            }
        )

        return response.data;

    } catch(error){
        console.error('Error:', error.response || error.message);
        throw error;
    }

}