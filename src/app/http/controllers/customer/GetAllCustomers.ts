import { CustomerRepository } from '@/app/domain/repositories/pg/CustomerRepository';
import { GetAllCustomersUseCase } from '@/app/domain/use-cases/customer/GetAllCustomersUseCase';
import { GetAllFilteredCustomersUseCase } from '@/app/domain/use-cases/customer/GetAllFilteredCustomersUseCase';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

class GetAllCustomers {
  async getAll(request: FastifyRequest, reply: FastifyReply) {
    try {
      let customers;

      const getAllCustomersParamSchema = z.object({
        pageIndex: z.coerce.number(),
        name: z.string().optional(),
        email: z.string().optional(),
        phone: z.string().optional(),
      });

      const { pageIndex, name, email, phone } =
        getAllCustomersParamSchema.parse(request.query);

      const customerRepository = new CustomerRepository();
      const getAllCustomersUseCase = new GetAllCustomersUseCase(
        customerRepository
      );
      const getAllFilteredCustomersUseCase = new GetAllFilteredCustomersUseCase(
        customerRepository
      );

      if (name || email || phone) {
        customers = await getAllFilteredCustomersUseCase.execute({
          pageIndex,
          name,
          email,
          phone,
        });
        return reply.status(200).send(customers);
      }

      customers = await getAllCustomersUseCase.execute({ pageIndex });
      return reply.status(200).send(customers);
    } catch (error) {
      throw error;
    }
  }
}

export default new GetAllCustomers();
