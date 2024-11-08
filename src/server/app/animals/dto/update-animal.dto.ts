import {
    ArrayMaxSize,
    ArrayMinSize,
    IsArray,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsUrl,
    ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Extlinks } from './extlinks.dto';
import { Image } from 'src/server/entity/image.entity';

export class UpdateAnimalDto {
    @IsOptional()
    @IsNumber()
    id: number;

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
    @Type(() => Extlinks)
    extlinks: Extlinks[];
}
