import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/use/ws';
import 'dotenv/config';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import Notification from './graphql/models/Notification.js';
import Medication from './graphql/models/Medication.js';
import User from './graphql/models/User.js';
import MedicationLog from './graphql/models/MedicationLog.js';

import userTypeDefs from './graphql/typeDefs/userTypeDefs.js';
import medicationTypeDefs from './graphql/typeDefs/medicationTypeDefs.js';
import notificationTypeDefs from './graphql/typeDefs/notificationTypeDefs.js';
import userResolvers from './graphql/resolvers/userResolvers.js';
import medicationResolvers from './graphql/resolvers/medicationResolvers.js';
import notificationResolvers from './graphql/resolvers/notificationResolvers.js';

const schema = makeExecutableSchema({
  typeDefs: [userTypeDefs, medicationTypeDefs, notificationTypeDefs],
  resolvers: [userResolvers, medicationResolvers, notificationResolvers],
});

const app = express();
const httpServer = http.createServer(app);

app.use(express.json());
app.use(cors());

const server = new ApolloServer({
  schema,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

/* const syncModels = async () => {
  await User.sync({ alter: true });
  await Medication.sync({ alter: true });
  await MedicationLog.sync({ alter: true });
  await Notification.sync({ alter: true });
  console.log('Tabelas sincronizadas com a base de dados.');
};

syncModels(); */

const startServer = async () => {
  await server.start();
  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: async ({ req }) => {
        const authHeader = req.headers.authorization || '';
        console.log('Authorization Header:', authHeader);
        if (authHeader) {
          const token = authHeader.split(' ')[1];
          console.log('Token:', token);
          try {
            const payload = jwt.verify(token, process.env.JWT_KEY);
            console.log('Decoded payload:', payload);
            return { loggedIn: true, user: payload };
          } catch (err) {
            console.error("Erro ao verificar token:", err);
            return { loggedIn: false, user: null };
          }
        }
        return { loggedIn: false, user: null };
      },
    })
  );

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
  });
  useServer({ schema }, wsServer);

  const PORT = process.env.PORT || 4000;
  httpServer.listen(PORT, () => {
    console.log(`Servidor pronto em http://localhost:${PORT}/graphql`);
  });
};

startServer();