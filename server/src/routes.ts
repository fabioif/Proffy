import express from 'express';
import ClassesControllers from './controllers/ClassesController';
import ConnectionsController from './controllers/connectionsController';


const routes = express.Router();

const classesControllers = new ClassesControllers();
const connectionsController = new ConnectionsController();

routes.post('/classes', classesControllers.Create);
routes.get('/classes', classesControllers.index);

routes.post('/connections',connectionsController.create);
routes.get('/connections',connectionsController.index);
export default routes;