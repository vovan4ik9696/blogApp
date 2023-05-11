import axios from 'axios';

export default class BlogApiService {
  _api = 'https://blog.kata.academy/api/';

  getArticles = async (page) => {
    const offset = page * 20 - 20;
    const response = await axios.get(`${this._api}articles`, {
      params: { offset },
    });
    return response.data;
  };

  getArticle = async (slug) => {
    const response = await axios.get(`${this._api}articles/${slug}`);
    return response.data;
  };

  newUser = async (userData) => {
    const registerUser = await axios.post(`${this._api}users`, userData);
    return registerUser.data;
  };

  postUserData = async (userData) => {
    const logUser = await axios.post(`${this._api}users/login`, userData);
    return logUser.data;
  };

  updateUserDate = async (userData, token) => {
    const config = {
      headers: {
        Authorization: `Token ${token}`,
      },
    };

    const updateUser = await axios.put(`${this._api}user`, userData, config);
    console.log(updateUser.data);
    return updateUser.data;
  };
}
