import { FastifyInstance } from 'fastify';
import { RoutesDependencies } from './routes-dependencies';
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts';
import { getAllOwnerSchemas } from './schemas/owners/get-all-owner.schemas';
import { OwnerService } from '../service/owner.service';
import { postOwnerSchemas } from './schemas/owners/post-owner.schemas';

export async function registerOwnerRoutes(
  app: FastifyInstance,
  dependencies: RoutesDependencies<OwnerService>
) {
  const { service } = dependencies;

  const typedApp = app.withTypeProvider<JsonSchemaToTsProvider>();

  typedApp.get('/api/owners', { schema: getAllOwnerSchemas }, async () => {
    const owners = await service.getAll();
    return owners;
  });

  typedApp.post(
    '/api/owners',
    { schema: postOwnerSchemas },
    async (request, reply) => {
      const response = await service.create(request.body);
      reply.status(201);
      return response;
    }
  );
}
