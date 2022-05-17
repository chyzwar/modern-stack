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
  name: string,
  email: string;
  sub: string
}

export interface FacebookProfile {
  name: string,
  email: string;
  id: string
}
