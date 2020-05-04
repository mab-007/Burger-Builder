import axios from 'axios';

const instance = axios.create({
	baseURL:'https://react-my-burger-9c24a.firebaseio.com/'
});

export default instance;