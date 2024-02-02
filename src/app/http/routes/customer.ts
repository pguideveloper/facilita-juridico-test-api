import { FastifyInstance } from 'fastify';
import CreateCustomer from '../controllers/customer/CreateCustomer';
import GetAllCustomers from '../controllers/customer/GetAllCustomers';
import CalculaRoute from '../controllers/customer/CalculaRoute';

export async function users(app: FastifyInstance) {
  app.post('/customer', CreateCustomer.create);
  app.get('/customer', GetAllCustomers.getAll);
  app.get('/calculate', CalculaRoute.calculate);
}
