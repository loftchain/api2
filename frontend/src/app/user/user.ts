import { Resource, ResourceWithoutId } from './resourse.model';

interface UserFields {
  email: string;
  firstName: string;
  lastName: string;
}

export interface User extends Resource, UserFields {}
export interface UserWithoutId extends ResourceWithoutId, UserFields {}
