import { CustomerRepository } from '@/app/domain/repositories/pg/CustomerRepository';
import { CalculateRouteUseCase } from '@/app/domain/use-cases/customer/CalculateRoute';
import { FastifyReply, FastifyRequest } from 'fastify';

class CalculateRoute {
  async calculate(_: FastifyRequest, reply: FastifyReply) {
    try {
      const customerRepository = new CustomerRepository();
      const calculateRouteUseCase = new CalculateRouteUseCase(
        customerRepository
      );
      const customers = await calculateRouteUseCase.execute();
      return reply.status(200).send(customers);
    } catch (error) {
      throw error;
    }
  }
}

export default new CalculateRoute();
