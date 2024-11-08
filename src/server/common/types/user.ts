export type Provider = 'google' | 'cognito' | 'facebook' | 'app';

export class User {
  id!: number;
  username!: string;
  provider!: Provider;
  providerId!: string;
  firstName!: string;
  lastName!: string;
  email!: string;
  picture!: string;
  created_at?: Date;
  updated_at?: Date;
}
