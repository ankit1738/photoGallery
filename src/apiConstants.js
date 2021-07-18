export const DEFAULT_URL = `https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=${process.env.REACT_APP_API_KEY}&format=json&nojsoncallback=1&per_page=10`;

export const PHOTO_SEARCH = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${process.env.REACT_APP_API_KEY}&format=json&nojsoncallback=1`;

export const GET_PHOTO = "https://live.staticflickr.com/";
