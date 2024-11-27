import axios from 'axios';

const requestPermission = async (data) => {
  try {
    const response = await axios.post('https://tu-api.com/api/permissions', data);
    console.log('Permiso solicitado:', response.data);
  } catch (error) {
    console.error('Error al solicitar permiso:', error);
  }
};
