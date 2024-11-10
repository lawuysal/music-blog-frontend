const BASE_URL =
  "https://musicblog-plcenter-dev-hzf8fcfcgnhje5b6.polandcentral-01.azurewebsites.net";

const ENDOPOINTS = {
  GALLERY_IMAGES: `${BASE_URL}/api/galleryimages`,
  ARTICLE_IMAGES: `${BASE_URL}/api/articleimages`,
  CATEGORIES: `${BASE_URL}/api/categories`,
  UPLOAD_GALLERY_IMAGE: `${BASE_URL}/api/galleryimages/upload`,
  ARTICLES: `${BASE_URL}/api/articles`,
  LOGIN: `${BASE_URL}/api/auth/login`,
  CHECK_TOKEN: `${BASE_URL}/api/auth/checktoken`,
};

export { ENDOPOINTS, BASE_URL };
