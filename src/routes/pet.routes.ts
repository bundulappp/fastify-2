import { FastifyInstance } from 'fastify';
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts';
import { getAllPetSchema } from './schemas/pets/get-all-pet.schemas';
import { postPetSchema } from './schemas/pets/post-pet.schema';
import { RoutesDependencies } from './routes-dependencies';
import { PetService } from '../service/pet.service';

export async function registerPetRoutes(
  app: FastifyInstance,
  dependencies: RoutesDependencies<PetService>
) {
  const { service } = dependencies;

  const typedApp = app.withTypeProvider<JsonSchemaToTsProvider>();

  typedApp.get(
    '/api/pets',
    {
      schema: getAllPetSchema,
    },
    async () => {
      const pets = await service.getAll();
      return pets;
    }
  );

  typedApp.post(
    '/api/pets',
    {
      schema: postPetSchema,
    },
    async (request, reply) => {
      const created = await service.create(request.body);
      reply.status(201);
      return created;
    }
  );
}
