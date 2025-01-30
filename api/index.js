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

import authMiddleware from './graphql/utils/authMiddleware.js';

const schema = makeExecutableSchema({
  typeDefs: [userTypeDefs, medicationTypeDefs, notificationTypeDefs],
  resolvers: [userResolvers, medicationResolvers, notificationResolvers],
});

const app = express();
const httpServer = http.createServer(app);

app.use(express.json());
app.use(cors());

// Aplicar middleware de autenticação
app.use(authMiddleware);

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
      context: async ({ req }) => ({ user: req.user }), // Certifique-se de que o contexto está sendo passado corretamente
    })
  );

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
  });

  useServer({ schema }, wsServer);

  const PORT = process.env.PORT || 4000;
  httpServer.listen(PORT, () => {
    console.log(`🚀 Servidor pronto em http://localhost:${PORT}/graphql`);
  });
};

startServer();