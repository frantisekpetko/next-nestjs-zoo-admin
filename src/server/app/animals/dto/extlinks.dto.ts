import { IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';

export class Extlinks {
    @IsOptional()
    @IsNumber()
    id: number;

    @IsUrl(undefined, { message: 'Animal URLs is not valid.' })
    @IsOptional()
    @IsString({ message: 'URL is not string!' })
    link: string;
}
