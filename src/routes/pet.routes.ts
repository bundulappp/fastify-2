import { FastifyInstance } from 'fastify';
import { PetService } from '../service/pet.service';

const petSchema = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    name: { type: 'string' },
    age: { type: 'number' },
    weightInKg: { type: 'number' },
  },
};

export const petResponseSchema = {
  200: {
    petSchema,
  },
} as const;

export const getAllPetResponseSchema = {
  200: {
    type: 'array',
    items: petSchema,
  },
};

export const petPostBodyRequestSchema = {
  type: 'object',
  properties: {
    name: { type: 'string', minLength: 1, maxLength: 50 },
    age: { type: 'number', minimum: 0 },
    weightInKg: { type: 'number', minimum: 0 },
  },
  required: ['name', 'age', 'weightInKg'],
  additionalProperties: false,
} as const;

type RoutesDependencies = {
  petService: PetService;
};

export async function registerPetRoutes(
  app: FastifyInstance,
  dependencies: RoutesDependencies
) {
  const { petService } = dependencies;

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

      //   const created = await petService.create(petToCreate);
      reply.status(201);
      //   return created;
    }
  );
}
