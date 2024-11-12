import fastify from 'fastify';
import { PetService } from '../service/pet.service';
import { PetRepository } from '../repository/pet.repository';
import { DbClient } from '../db';
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts';
import { registerPetRoutes } from '../routes/pet.routes';
import { registerOwnerRoutes } from '../routes/owner.routes';
import { OwnerRepository } from '../repository/owner.repository';
import { OwnerService } from '../service/owner.service';

type Dependencies = {
  dbClient: DbClient;
};

export default function createApp(options = {}, dependencies: Dependencies) {
  const { dbClient } = dependencies;
  const app = fastify(options).withTypeProvider<JsonSchemaToTsProvider>();

  //Pets
  const petRepository = new PetRepository(dbClient);
  const petService = new PetService(petRepository);
  registerPetRoutes(app, { service: petService });

  //Owners
  const ownerRepository = new OwnerRepository(dbClient);
  const ownerService = new OwnerService(ownerRepository);
  registerOwnerRoutes(app, { service: ownerService });
  return app;
}
