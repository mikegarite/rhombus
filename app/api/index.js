import axios from 'axios';

const api = {
	base : 'https://admin.api.rhombusads.com/v2',
	cors: 'https://cors-anywhere.herokuapp.com/',
	login: '/users/login',
	publishers: '/publishers',
	analytics: '/analytics',
	embeds: '/embeds'
}

export const auth = function(payload) {
  return axios.post(api.cors+api.base+api.login, {
    username: payload.email,
    password: payload.password
  })
  .then(response => response.data)
  .catch(error => error);
};


export const publisherDetails = function(payload) {
	const pub_details = axios.create({
	  baseURL: api.cors+api.base+api.publishers,
	  timeout: 4000,
	  headers: {'Authorization': 'Bearer '+payload.token}
	});

	return pub_details.get('/'+payload.id)
	.then(response => response.data)
	.catch(error => error);
}

export const publisherAnalytics = function(payload) {
	const pub_details = axios.create({
	  baseURL: api.cors+api.base+api.publishers+'/'+payload.id,
	  timeout: 4000,
	  headers: {'Authorization': 'Bearer '+payload.token}
	});

	return pub_details.get(api.analytics)
	.then(response => response.data)
	.catch(error => error);
}

export const publisherEmbeds = function(payload) {
	const pub_details = axios.create({
	  baseURL: api.cors+api.base+api.publishers+'/'+payload.id,
	  timeout: 4000,
	  headers: {'Authorization': 'Bearer '+payload.token}
	});

	return pub_details.get(api.embeds)
	.then(response => response.data)
	.catch(error => error);
}