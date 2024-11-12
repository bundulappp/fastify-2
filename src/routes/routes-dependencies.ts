import { PetService } from '../service/pet.service';

export type RoutesDependencies<T> = {
  service: T;
};
