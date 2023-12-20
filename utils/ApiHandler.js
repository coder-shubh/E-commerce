import Globals from './Globals';
import axios from 'axios';
// Call post Api
export function postApiCall(param) {
  const AuthStr = 'Basic'.concat('App1app#123');
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': AuthStr,
    'ApiVersion': Globals.ApiVersion
  }
  var url = param.url;
  var json = param.json;
  console.log(json)
  return axios.post(Globals.API_URL.concat(url), json).then((response) => {
    return response.data;
  }).catch(error => {
    if (error.toJSON().message === 'Network Error') {
      alert('no internet connection');
      //dispatch({type: RELOAD});
    }
    return error;
  }
  );
}
// Call Get Api
export function getApiCall(param) {
  const AuthStr = 'Bearer'.concat(Globals.token);
  var url = param.url;
  return axios.get(Globals.API_URL.concat(url), { headers: { "Content-Type": "application/json", Authorization: "Bearer " + Globals.token } }).then((response) => {
    return response.data;
  }).catch(error => {
    return error;
  });

}

export function postApi(param) {
  const AuthStr = 'Basic'.concat('App1app#123');
  // const headers = {
  //   'Content-Type': 'application/json',
  //   'Authorization': AuthStr,
  //   'ApiVersion': Globals.ApiVersion
  // }
  var url = param.url;
  var json = param.json;
  console.log(Globals.API_URL.concat(url))
  console.log(Globals.token)
  console.log(json)
  return axios.post(Globals.API_URL.concat(url), json, { headers: { "Content-Type": "application/json", Authorization: "Bearer " + Globals.token } }).then((response) => {
    return response.data;
  }).catch(error => {
    if (error.toJSON().message === 'Network Error') {
      alert('no internet connection');
      //dispatch({type: RELOAD});
    }
    return error;
  }
  );
}
