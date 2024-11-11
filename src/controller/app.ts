import fastify from 'fastify';
import { PetService } from '../service/pet.service';
import { PetRepository } from '../repository/pet.repository';
import { DbClient } from '../db';
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts';
import { petPostBodyRequestSchema } from './schemas/pet/request/pet-post-body-request.schema';
import {
  getAllPetResponseSchema,
  petResponseSchema,
} from './schemas/pet/response/pet-response.schema';
type Dependencies = {
  dbClient: DbClient;
};

export default function createApp(options = {}, dependencies: Dependencies) {
  const { dbClient } = dependencies;

  const petRepository = new PetRepository(dbClient);
  const petService = new PetService(petRepository);

  const app = fastify(options).withTypeProvider<JsonSchemaToTsProvider>();

  app.get(
    '/api/pets',
    { schema: { response: getAllPetResponseSchema } },
    async () => {
      const pets = await petService.getAll();
      return pets;
    }
  );

  app.post(
    '/api/pets',
    {
      schema: {
        body: petPostBodyRequestSchema,
        response: petResponseSchema,
      },
    },
    async (request, reply) => {
      const { body: petToCreate } = request;

      const created = await petService.create(petToCreate);
      reply.status(201);
      return created;
    }
  );

  return app;
}
