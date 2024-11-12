export const postOwnerSchemas = {
  body: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      age: { type: 'number' },
    },
    required: ['name', 'age'],
    additionalProperties: false,
  },
  response: {
    201: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        name: { type: 'string' },
        age: { type: 'number' },
      },
      required: ['id', 'name', 'age'],
    },
  },
} as const;
