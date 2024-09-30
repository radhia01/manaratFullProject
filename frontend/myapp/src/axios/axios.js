import axios from "axios"
const axiosInstance= axios.create({
    baseURL:"https://manaratapi.onrender.com",
    withCredentials:true,
    credential:"include",
    headers:{
        "Content-Type":"application/json",

       
    }
});

      
      export default axiosInstance;