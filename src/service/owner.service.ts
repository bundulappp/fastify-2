import { OwnerToCreate } from '../entity/owner.type';
import { OwnerRepository } from '../repository/owner.repository';

export class OwnerService {
  constructor(private repository: OwnerRepository) {}

  async getAll() {
    return await this.repository.read();
  }

  async create(owner: OwnerToCreate) {
    return await this.repository.create(owner);
  }
}
