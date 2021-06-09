import Geocode from 'react-geocode';

const { GOOGLE_API_KEY } = require('constants/constants');

Geocode.setApiKey(GOOGLE_API_KEY);

Geocode.setLocationType('ROOFTOP');

const getLatLongFromZip = async (zipcode) => {
  try {
    const response = await Geocode.fromAddress(zipcode);
    console.log(response);
    const location = response.results[0].geometry.location;
    console.log(location);
    return location;
  } catch (error) {
    console.error(error);
  }
};

export default getLatLongFromZip;
