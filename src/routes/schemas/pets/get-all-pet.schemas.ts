export const getAllPetSchema = {
  response: {
    200: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          name: { type: 'string' },
          age: { type: 'number' },
          weightInKg: { type: 'number' },
        },
        required: ['id', 'name', 'age', 'weightInKg'],
      },
    },
  },
} as const;
