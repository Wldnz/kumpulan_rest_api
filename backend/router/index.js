import { Router } from "express";
import db from '../db/index.js';
const app = Router();

import customers from './handler/customers.js';
import fish from './handler/fish.js';
import sales from './handler/sales.js';

db.connect();

app.use('/',customers);
app.use('/',fish);
app.use('/',sales);

export default app;