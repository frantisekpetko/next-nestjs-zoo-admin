import { Provider } from 'src/server/common/types/user';

export class CreateUserDto {
  provider: Provider;
  providerId: string;
  firstName: string;
  lastName: string;
  email: string;
  picture: string;
}
