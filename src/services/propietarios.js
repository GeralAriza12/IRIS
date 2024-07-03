import axios from 'axios';

const API_URL = 'http://localhost:5000/api/propietarios';

export const getPropietarios = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los propietarios:", error);
    throw error;
  }
};

export const agregarPropietario = async (propietario) => {
  try {
    const response = await axios.post(API_URL, propietario);
    return response.data;
  } catch (error) {
    console.error("Error al agregar el propietario:", error);
    throw error;
  }
};

export const updatePropietario = async (id, propietario) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, propietario);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el propietario:", error);
    throw error;
  }
};

export const deletePropietario = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Error al eliminar el propietario:", error);
    throw error;
  }
};
