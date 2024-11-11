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
