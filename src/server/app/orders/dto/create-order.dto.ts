import { Thing } from '../../things/thing.entity';

export class CreateOrderDto {
  alias: string;
  thing: Thing;
}

export class CreateOrderFromThingDetailsDto {
  alias: string;
  thingName: string;
}
