const urlToObject = async (imageUrl, imageName) => {
  const response = await fetch(imageUrl);
  const blob = await response.blob();
  const file = new File([blob], imageName, { type: blob.type });
  console.log(file);
  return file;
};

export default urlToObject;
