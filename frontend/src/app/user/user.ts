import { Resource, ResourceWithoutId } from './resourse.model';

interface UserFields {
  email: string;
  name: string;
  password: string;
  createdAt?: string;
}

export interface User extends Resource, UserFields {}
export interface UserWithoutId extends ResourceWithoutId, UserFields {}
