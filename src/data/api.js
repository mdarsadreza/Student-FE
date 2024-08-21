//API CALLING
import axios from 'axios';

export async function studentsFindAll() {
  try {
    const response = await axios.get('http://localhost:9291/student/findAll');
    return response.data;
  } catch (error) {
    console.error("Error fetching students:", error);
    return [];
  }
}

export async function studentsFindById(id) {
  try {
    const response = await axios.get(`http://localhost:9291/student/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching students:", error);
    return [];
  }
}

export async function uploadCSVFile(data) {
  try {
    const response = await axios.post('http://localhost:9291/students/save-csv-file', data);
    return response.data;
  } catch (error) {
    console.error("Error fetching students:", error);
    return [];
  }
}

