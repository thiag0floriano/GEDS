import jwtDecode from 'jwt-decode'
import router from '../router/index';

const getToken = () => localStorage.getItem('token');

const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    const decoded = jwtDecode(token);
    const now = Date.now() / 1000;
    return decoded.exp < now;
  } catch (e) {
    console.error('Token decoding failed:', e);
    return true; 
  }
};

const checkToken = () => {
    const token = getToken();
    
    if (isTokenExpired(token)) {
        localStorage.removeItem('token');
        router.push('/login');
        return false;
    }
    return true;
};  

export default {
  getToken,
  isTokenExpired,
  checkToken,
};
