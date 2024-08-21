//API CALLING
import axios from 'axios';

export async function studentsFindAll() {
  try {
    console.log("response.data.users");
    const response = await axios.get('http://localhost:9291/student/findAll');
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching students:", error);
    return [];
  }
}

export async function studentsFindById(id) {
  try {
    console.log("response.data.users", id);
    const response = await axios.get(`http://localhost:9291/student/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching students:", error);
    return [];
  }
}


