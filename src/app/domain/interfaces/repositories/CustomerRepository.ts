import { Customer } from '../../model/Customer';

export interface ICustomerRepository {
  getByEmail(email: string): Promise<Customer | null>;
  getFiltered(
    pageIndex?: number,
    name?: string,
    email?: string,
    phone?: string
  ): Promise<{ customers: Customer[] | []; total?: number }>;
  getAll(
    pageIndex?: number
  ): Promise<{ customers: Customer[] | []; total?: number }>;
  create(customer: Customer): Promise<Customer>;
}
