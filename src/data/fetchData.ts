import axios from 'axios';

export const fetchData = async () => {
  const response = await axios.get('data.json');
  return response.data;
};
