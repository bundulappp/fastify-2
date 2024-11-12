export const getAllOwnerSchemas = {
  response: {
    200: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          name: { type: 'string' },
          age: { type: 'number' },
        },
        required: ['id', 'name', 'age'],
      },
    },
  },
} as const;
