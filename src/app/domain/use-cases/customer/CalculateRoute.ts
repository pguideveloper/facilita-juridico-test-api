import { calculateRoute } from '@/app/helpers/calculateRoute';
import { ICustomerRepository } from '../../interfaces/repositories/CustomerRepository';
import { Customer } from '../../model/Customer';

interface CalculateRouteUseCaseResponse {
  customers: Customer[];
}

export class CalculateRouteUseCase {
  constructor(private customerRepository: ICustomerRepository) {}

  async execute(): Promise<CalculateRouteUseCaseResponse> {
    const query = await this.customerRepository.getAll();
    const customers = query.customers;
    const result = calculateRoute([
      {
        id: '6280d2e4-e6f7-4f54-89a6-2b98b5eade9c',
        name: 'Facilita Limpeza',
        email: 'company@mail.com',
        phone: '(12) 99999-9999',
        coordinates: { x: 0, y: 0 },
      },
      ...customers,
    ]);

    return {
      customers: result,
    };
  }
}
