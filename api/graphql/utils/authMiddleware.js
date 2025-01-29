import jwt from 'jsonwebtoken';
import 'dotenv/config';

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization || '';

  if (authHeader) {
    const token = authHeader.split(' ')[1];
    try {
      const payload = jwt.verify(token, process.env.JWT_KEY);
      req.user = { loggedIn: true, id: payload.userId };
    } catch (err) {
      console.error('Erro ao verificar token:', err);
      req.user = { loggedIn: false, user: null };
    }
  } else {
    req.user = { loggedIn: false, user: null };
  }

  next();
};

export default authMiddleware;