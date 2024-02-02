import { CustomerAlreadyExists } from '@/app/errors/CustomerAlreadyExistsError';
import { ICustomerRepository } from '../../interfaces/repositories/CustomerRepository';
import { Coordinates, Customer } from '../../model/Customer';
import { randomUUID } from 'crypto';

interface CreateCustomerUseCaseRequest {
  name: string;
  email: string;
  phone: string;
  coordinates: Coordinates;
}

interface CreateCustomerUseCaseResponse {
  customer: Customer;
}

export class CreateCustomerUseCase {
  constructor(private customerRepository: ICustomerRepository) {}

  async execute(
    customer: CreateCustomerUseCaseRequest
  ): Promise<CreateCustomerUseCaseResponse> {
    const customerAlreadyExists = await this.customerRepository.getByEmail(
      customer.email
    );

    if (customerAlreadyExists) {
      throw new CustomerAlreadyExists();
    }

    const createdCustomer = await this.customerRepository.create({
      id: randomUUID(),
      email: customer.email,
      name: customer.name,
      phone: customer.phone,
      coordinates: customer.coordinates,
    });

    return {
      customer: createdCustomer,
    };
  }
}
