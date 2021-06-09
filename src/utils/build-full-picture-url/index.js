const { PICTURE_URL_PREFIX } = require('constants/constants');

const buildFullPictureUrl = (pictureUrlSuffix) => {
  return `${PICTURE_URL_PREFIX}${pictureUrlSuffix}`;
};

export default buildFullPictureUrl;
