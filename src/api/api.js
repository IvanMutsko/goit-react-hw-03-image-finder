import axios from 'axios';

const API_URL = 'https://pixabay.com/api/';
const API_KEY = '34333824-9219051eb032542ff34aab4aa';

export const fetchPhotos = async (searchRequest, page) => {
  const searchParams = {
    params: {
      key: API_KEY,
      q: searchRequest,
      image_type: 'photo',
      orientation: 'horizontal',
      page: page,
      per_page: 12,
    },
  };

  try {
    const response = await axios.get(API_URL, searchParams);

    const photos = response.data;

    return photos;
  } catch (error) {
    console.log(error);
  }
};
