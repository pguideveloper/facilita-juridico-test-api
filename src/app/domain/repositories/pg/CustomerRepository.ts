import { client } from '@/data/dbConnection';
import { ICustomerRepository } from '../../interfaces/repositories/CustomerRepository';
import { Customer } from '../../model/Customer';

export class CustomerRepository implements ICustomerRepository {
  async getByEmail(email: string): Promise<Customer | null> {
    try {
      const result = await client.query(
        'SELECT * FROM customer WHERE email = $1',
        [email]
      );
      return result.rows.length ? result.rows[0] : null;
    } catch (error) {
      console.log(error);
      throw new Error('Error while getting customer by email');
    }
  }

  async getFiltered(
    pageIndex: number,
    name?: string,
    email?: string,
    phone?: string
  ): Promise<{ customers: Customer[] | []; total?: number }> {
    try {
      let query = 'SELECT * FROM customer';
      let whereClause = '';

      if (name) {
        whereClause += whereClause
          ? ` AND name ILIKE '%${name}%'`
          : ` WHERE name ILIKE '%${name}%'`;
      }

      if (email) {
        whereClause += whereClause
          ? ` AND email ILIKE '%${email}%'`
          : ` WHERE email ILIKE '%${email}%'`;
      }

      if (phone) {
        whereClause += whereClause
          ? ` AND phone ILIKE '%${phone}%'`
          : ` WHERE phone ILIKE '%${phone}%'`;
      }

      const totalResult = await client.query(
        `SELECT COUNT(*) FROM customer ${whereClause}`
      );

      if (pageIndex !== undefined) {
        const limit = 10;
        const offset = pageIndex * limit;
        query = `SELECT * FROM customer ${whereClause} LIMIT ${limit} OFFSET ${offset}`;
      }

      const result = await client.query(query);

      return result.rows.length
        ? {
            customers: result.rows,
            total: parseInt(totalResult.rows[0].count),
          }
        : {
            customers: [],
            total: 0,
          };
    } catch (error) {
      console.log(error);
      throw new Error('Error while getting customers');
    }
  }

  async getAll(
    pageIndex: number
  ): Promise<{ customers: Customer[] | []; total?: number }> {
    try {
      let query = 'SELECT * FROM customer';
      const totalResult = await client.query(`SELECT COUNT(*) FROM customer`);

      if (pageIndex !== undefined) {
        const limit = 10;
        const offset = pageIndex * limit;
        query = `SELECT * FROM customer LIMIT ${limit} OFFSET ${offset}`;
      }

      const result = await client.query(query);

      return result.rows.length
        ? {
            customers: result.rows,
            total: parseInt(totalResult.rows[0].count),
          }
        : {
            customers: [],
            total: 0,
          };
    } catch (error) {
      console.log(error);
      throw new Error('Error while getting customers');
    }
  }

  async create({
    id,
    name,
    email,
    phone,
    coordinates,
  }: Customer): Promise<Customer> {
    try {
      const result = await client.query(
        'INSERT INTO customer(name, email, phone, coordinates, id) VALUES($1, $2, $3, $4, $5) RETURNING *',
        [name, email, phone, coordinates, id]
      );

      return result.rows[0];
    } catch (error) {
      console.log(error);
      throw new Error('Error while create a new customer');
    }
  }
}
