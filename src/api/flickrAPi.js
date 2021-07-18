import axios from "axios";

// TODO: move api key to node_env
const BASE_URL =
    "https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=519963ba315f08eb1d251459d8cc19cb";

export const searchPhotos = ({ searchText, page }) => {
    console.log(searchText, page);
    const url = `${BASE_URL}&text=${searchText}&per_page=10&page=${page}&format=json&nojsoncallback=1`;
    return axios.get(url);
};
