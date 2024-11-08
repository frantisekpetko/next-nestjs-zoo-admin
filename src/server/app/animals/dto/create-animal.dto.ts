import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsUrl,
  ValidateNested,
} from 'class-validator';

export class CreateAnimalDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  latinname: string;

  @IsNotEmpty()
  description: string;
  
  @IsNotEmpty()
  image: string;
  
  @IsUrl()
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @ArrayMaxSize(Infinity)
  extlinks: string[];
}
