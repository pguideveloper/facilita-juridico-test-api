import { ICustomerRepository } from '../../interfaces/repositories/CustomerRepository';
import { Customer } from '../../model/Customer';

interface GetAllCustomersUseCaseRequest {
  pageIndex: number;
}

interface GetAllCustomersUseCaseResponse {
  customers: Customer[];
  meta?: {
    pageIndex: number;
    totalCount: number;
  };
}

export class GetAllCustomersUseCase {
  constructor(private customerRepository: ICustomerRepository) {}

  async execute({
    pageIndex,
  }: GetAllCustomersUseCaseRequest): Promise<GetAllCustomersUseCaseResponse> {
    const { customers, total } =
      await this.customerRepository.getAll(pageIndex);
    return {
      customers,
      meta: {
        pageIndex,
        totalCount: total ?? 0,
      },
    };
  }
}
