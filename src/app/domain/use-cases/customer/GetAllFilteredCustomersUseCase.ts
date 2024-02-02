import { ICustomerRepository } from '../../interfaces/repositories/CustomerRepository';
import { Customer } from '../../model/Customer';

interface GetAllFilteredCustomersUseCaseRequest {
  pageIndex: number;
  name?: string;
  email?: string;
  phone?: string;
}

interface GetAllFilteredCustomersUseCaseResponse {
  customers: Customer[];
  meta?: {
    pageIndex: number;
    totalCount: number;
  };
}

export class GetAllFilteredCustomersUseCase {
  constructor(private customerRepository: ICustomerRepository) {}

  async execute({
    pageIndex,
    name,
    email,
    phone,
  }: GetAllFilteredCustomersUseCaseRequest): Promise<GetAllFilteredCustomersUseCaseResponse> {
    const { customers, total } = await this.customerRepository.getFiltered(
      pageIndex,
      name,
      email,
      phone
    );

    return {
      customers,
      meta: {
        pageIndex,
        totalCount: total ?? 0,
      },
    };
  }
}
