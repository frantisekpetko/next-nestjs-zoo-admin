export type Provider = 'google' | 'cognito' | 'facebook';

export class User {
  id!: number;
  provider!: Provider;
  providerId!: string;
  firstName!: string;
  lastName!: string;
  email!: string;
  picture!: string;
  created_at?: Date;
  updated_at?: Date;
}
