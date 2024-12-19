import 'dotenv/config';
import express, { Express } from 'express';
import cors from 'cors';
import http from 'http';

import { connectDB } from './config/db';
import session from 'express-session';
import authRouter from './routes/authRouter';
import employeeInformRouter from './routes/employeeInformRouter';
import drivingInformRouter from './routes/drivingInformRouter';
import scheduleRouter from './routes/scheduleRouter';
import userRouter from './routes/userRouter';
import dailyWorkRouter from './routes/dailyWorkRouter';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import { specs } from './swagger/swagger';

const app: Express = express();
const port = 8080;

const httpServer = http.createServer(app);

app.use(
  session({
    secret: process.env.SESSION_SECRET || '',
    resave: false,
    saveUninitialized: false,

    cookie: {
      maxAge: 60 * 1000 * 60 * 12, // 로그인 세션 12시간 유지
    },
  })
);

app.use(
  cors({
    origin: [
      'http://localhost:3000',
      process.env.IP_ADDR || '',
      process.env.DOMAIN_NAME || '',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  })
);
app.use(express.json());

connectDB();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/auth', authRouter);
app.use('/api/employee-inform', employeeInformRouter);
app.use('/api/employee-inform/dailyWork', dailyWorkRouter);
app.use('/api/driving-inform', drivingInformRouter);
app.use('/api/schedule', scheduleRouter);
app.use('/api/users', userRouter);

app.use(express.static(path.join(__dirname, '../../client/build')));
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../../client/build/index.html'));
});

httpServer.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
