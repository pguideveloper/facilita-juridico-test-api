import { CustomerRepository } from '@/app/domain/repositories/pg/CustomerRepository';
import { CreateCustomerUseCase } from '@/app/domain/use-cases/customer/CreateCustomerUseCase';
import { CustomerAlreadyExists } from '@/app/errors/CustomerAlreadyExistsError';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

class CreateCustomer {
  async create(request: FastifyRequest, reply: FastifyReply) {
    try {
      const createCustomerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        phone: z.string(),
        coordinates: z.object({
          x: z.coerce.number(),
          y: z.coerce.number(),
        }),
      });

      const { name, email, phone, coordinates } =
        createCustomerBodySchema.parse(request.body);

      const customerRepository = new CustomerRepository();
      const createCustomerUseCase = new CreateCustomerUseCase(
        customerRepository
      );
      const { customer } = await createCustomerUseCase.execute({
        name,
        email,
        phone,
        coordinates,
      });

      return reply.status(200).send({ customer });
    } catch (error) {
      if (error instanceof CustomerAlreadyExists) {
        return reply.status(400).send({ message: error.message });
      }

      throw error;
    }
  }
}

export default new CreateCustomer();
