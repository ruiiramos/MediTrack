import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userResolvers = {
  Query: {
    getUsers: async () => {
      return await User.findAll();
    },
  },
  Mutation: {
    register: async (_, { name, email, password }) => {
      try {
          const existingUser = await User.findOne({ where: { email } });
          if (existingUser) {
              throw new Error('Email já está em uso.');
          }

          const hashedPassword = await bcrypt.hash(password, 10);

          const user = await User.create({
              name,
              email,
              password: hashedPassword,
          });

          return { id: user.id, name: user.name, email: user.email };
      } catch (error) {
          throw new Error(error.message);
      }
  },

  login: async (_, { email, password }) => {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("Utilizador não encontrado");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Palavra-passe incorreta");
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_KEY, { expiresIn: "1h" });

    return { token };
  }    
  },
};

export default userResolvers;