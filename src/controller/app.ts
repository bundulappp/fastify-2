import fastify from 'fastify';
import { PetService } from '../service/pet.service';
import { PetRepository } from '../repository/pet.repository';
import { DbClient } from '../db';
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts';
import { registerPetRoutes } from '../routes/pet.routes';

type Dependencies = {
  dbClient: DbClient;
};

export default function createApp(options = {}, dependencies: Dependencies) {
  const { dbClient } = dependencies;

  const petRepository = new PetRepository(dbClient);
  const petService = new PetService(petRepository);

  const app = fastify(options).withTypeProvider<JsonSchemaToTsProvider>();
  registerPetRoutes(app, { petService });
  return app;
}
