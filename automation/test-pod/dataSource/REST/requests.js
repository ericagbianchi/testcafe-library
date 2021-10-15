const request = require('superagent');

function get(url) {
  return new Promise((resolve, reject) =>
    request
      .get(url)
      .accept('application/json')
      .type('application/json')
      .end((error, response) => {
        if (response && response.body) {
          resolve(response.body);
        } else {
          reject(error);
        }
      }));
}

function post(url, params) {
  return new Promise((resolve, reject) =>
    request
      .post(url)
      .send(params)
      .accept('application/json')
      .type('application/json')
      .end((error, response) => {
        if (response && response.status === 200) {
          resolve(response.body);
        } else {
          reject(error);
        }
      }));
}

function put(url, params) {
  return new Promise((resolve, reject) =>
    request
      .put(url)
      .send(params)
      .accept('application/json')
      .type('application/json')
      .end((error, response) => {
        if (response && response.status === 200) {
          resolve(response.body);
        } else {
          reject(error);
        }
      }));
}

function patch(url, params) {
  return new Promise((resolve, reject) =>
    request
      .patch(url)
      .send(params)
      .accept('application/json')
      .type('application/json')
      .end((error, response) => {
        if (response && response.status === 200) {
          resolve(response.body);
        } else {
          reject(error);
        }
      }));
}

function del(url) {
  return new Promise((resolve, reject) =>
    request
      .delete(url)
      .accept('application/json')
      .type('application/json')
      .end((error, response) => {
        if (response && response.status === 200) {
          resolve(response.body);
        } else {
          reject(error);
        }
      }));
}

module.exports = {
    get,
    post,
    put,
    patch,
    del
}