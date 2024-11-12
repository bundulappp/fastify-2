import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts';
import { PetService } from '../service/pet.service';
import { getAllPetSchema } from './schemas/pets/get-all-pet.schemas';
import { postPetSchema } from './schemas/pets/post-pet.schema';

type RoutesDependencies = {
  petService: PetService;
};
export async function registerPetRoutes(
  app: FastifyInstance,
  dependencies: RoutesDependencies
) {
  const { petService } = dependencies;

  const typedApp = app.withTypeProvider<JsonSchemaToTsProvider>();

  typedApp.get(
    '/api/pets',
    {
      schema: getAllPetSchema,
    },
    async () => {
      const pets = await petService.getAll();
      return pets;
    }
  );

  typedApp.post(
    '/api/pets',
    {
      schema: postPetSchema,
    },
    async (request, reply) => {
      const created = await petService.create(request.body);
      reply.status(201);
      return created;
    }
  );
}
