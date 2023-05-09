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
}
