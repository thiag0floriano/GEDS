<!-- <template>
    <div>
      <h1>Login</h1>
      <form @submit.prevent="login">
        <div>
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="username" required>
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  </template>
  
  <script>
  import api from '../services/api';
  
  export default {
    name: 'LoginPage',
    data() {
      return {
        username: '',
        password: '',
      };
    },
    methods: {
      async login() {
        try {
          const response = await api.post('/auth/login', {
            username: this.username,
            password: this.password,
          });
          localStorage.setItem('token', response.data.token);
          console.log('Token received:', response.data.token); // Adicione isto para depuração
          this.$router.push('/'); // Redireciona após o login
        } catch (error) {
          console.error('Error logging in:', error);
          alert('Invalid username or password');
        }
      },
    },
  };
  </script> -->

  <template>
    <div>
      <h1>Login</h1>
      <form @submit.prevent="login">
        <div>
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="username" required>
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <button type="submit">Login</button>
      </form>
      <!-- Exibir a diferença de tempo -->
      <p v-if="timeDifference !== null">Server time difference: {{ timeDifference }} seconds</p>
    </div>
  </template>
  
  <script>
  import api from '../services/api';
  import auth from '../services/auth'; // Certifique-se de usar `auth` se necessário
  
  export default {
    name: 'LoginPage',
    data() {
      return {
        username: '',
        password: '',
        timeDifference: null,
      };
    },
    methods: {
      async login() {
        // Verifica se o token já está presente e é válido
        if (auth.checkToken()) {
          this.$router.push('/');
          return;
        }
  
        try {
          const serverTimeResponse = await api.get('/server-time');
          const serverTime = new Date(serverTimeResponse.data.serverTime).getTime();
          const clientTime = new Date().getTime();
          
          this.timeDifference = Math.abs((serverTime - clientTime) / 1000);
  
          const response = await api.post('/auth/login', {
            username: this.username,
            password: this.password,
          });

          console.log('Login response:', response.data); // Adicione este log

  
          localStorage.setItem('token', response.data.token);
          console.log('Token stored:', localStorage.getItem('token')); // Verifique se o token é armazenado
          this.$router.push('/');
        } catch (error) {
          console.error('Error logging in:', error);
          alert('Invalid username or password');
        }
      },
    },
  };
  </script>
   