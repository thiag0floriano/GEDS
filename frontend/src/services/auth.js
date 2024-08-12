import jwtDecode from 'jwt-decode'
import router from '../router/index'; // Certifique-se de que o caminho está correto

const getToken = () => localStorage.getItem('token');

const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    const decoded = jwtDecode(token);
    const now = Date.now() / 1000;
    return decoded.exp < now;
  } catch (e) {
    console.error('Token decoding failed:', e);
    return true; // Considera o token como expirado se a decodificação falhar
  }
};

const checkToken = () => {
    const token = getToken();
    console.log('Token:', token); // Adicione este log
    
    if (isTokenExpired(token)) {
        localStorage.removeItem('token');
        console.log('Token expired, redirecting to /login'); // Adicione isso para depuração
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
