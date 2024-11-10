const jwt = require('jsonwebtoken');

// function authenticateToken(req, res, next) {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];

//   if (!token) {
//     return res.status(401).json({ message: 'Token de autenticação não fornecido' });
//   }

//   jwt.verify(token, 'your_jwt_secret', (err, user) => {
//     if (err) {
//       return res.status(403).json({ message: 'Token inválido' });
//     }
//     req.user = { id: user.userId };
//     next();
//   });
// }

// module.exports = { authenticateToken };

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token de autenticação não fornecido' });
  }

  jwt.verify(token, 'your_jwt_secret', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido' });
    }
    req.user = { userId: user.userId }; // Ajuste aqui
    next();
  });
}

module.exports = { authenticateToken };
