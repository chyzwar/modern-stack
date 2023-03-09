import { Role } from '@project/common';

export enum Provider {
  Google = 'Google',
  Facebook = 'Facebook',
  Custom = 'Custom',
}

export interface Profile {
  provider: Provider;
  providerId: string;
  name: string;
  email: string;
  role: Role
}

export interface GoogleProfile {
  id: string;
  given_name: string;
  family_name: string;
  picture: string;
  email: string;
  locale: string
}

export interface FacebookProfile {
  name: string,
  email: string;
  id: string
}
