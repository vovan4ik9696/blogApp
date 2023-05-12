import axios from 'axios';

export default class BlogApiService {
  _api = 'https://blog.kata.academy/api/';

  getArticles = async (page, token) => {
    const offset = page * 20 - 20;
    const response = await axios.get(`${this._api}articles`, {
      params: { offset },
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response.data;
  };

  getArticle = async (slug, token) => {
    const response = await axios.get(`${this._api}articles/${slug}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
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
    return updateUser.data;
  };

  postCreateArticle = async (userData, token) => {
    const config = {
      headers: {
        Authorization: `Token ${token}`,
      },
    };

    await axios.post(`${this._api}articles`, userData, config);
  };

  updateArticle = async (slug, userData, token) => {
    const config = {
      headers: {
        Authorization: `Token ${token}`,
      },
    };
    const response = await axios.put(`${this._api}articles/${slug}`, userData, config);
    return response.data;
  };

  deleteArticle = async (slug, token) => {
    const config = {
      headers: {
        Authorization: `Token ${token}`,
      },
    };
    await axios.delete(`${this._api}articles/${slug}`, config);
  };

  favoriteArticle = async (slug, token, doing) => {
    const config = {
      headers: {
        Authorization: `Token ${token}`,
      },
    };
    if (!doing) {
      return await axios.post(`${this._api}articles/${slug}/favorite`, null, config);
    } else if (doing) {
      return await axios.delete(`${this._api}articles/${slug}/favorite`, config);
    }
  };
}
