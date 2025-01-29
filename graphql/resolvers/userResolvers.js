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
    registerUser: async (_, { input }) => {
      if (Object.values(input).length === 0)
        throw new Error("You need to provide the body with the request.");
    
      const { name, email, password } = input;
    
      if (!name || !email || !password) 
        throw new Error("Fields missing");
    
      const userFound = await User.findOne({ where: { email } });
      if (userFound) throw new Error("Email in use");
    
      const hashedPassword = await bcrypt.hash(password, 10);
    
      const user = new User({
        name,
        email,
        password: hashedPassword,
      });
    
      const newUser = await user.save();
      return newUser;
    },
    loginUser: async (_, { input }) => {
      if (Object.values(input).length === 0)
        throw new Error("You need to provide the body with the request.");
    
      const { email, password } = input;
    
      if (!email || !password) throw new Error("Fields missing");
    
      const user = await User.findOne({ where: { email } });
      if (!user) throw new Error("User not found");
    
      const check = await bcrypt.compare(password, user.password);
      if (!check) throw new Error("Wrong password");
    
      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_KEY, {
        expiresIn: "7d",
      });
    
      return { token };
    },    
  },
};

export default userResolvers;