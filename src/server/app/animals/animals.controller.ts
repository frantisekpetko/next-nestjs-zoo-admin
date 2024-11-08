import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  DefaultValuePipe,
  Query,
  ParseIntPipe,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { Animal } from '../../entity/animal.entity';
import { Logger } from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

interface MulterFile {
  fieldname: string; // The name of the field in the form
  originalname: string; // The name of the file on the user's computer
  encoding: string; // The encoding type of the file
  mimetype: string; // The MIME type of the file
  size: number; // The size of the file in bytes
  destination: string; // The folder to which the file has been saved
  filename: string; // The name of the file within the destination
  path: string; // The full path to the uploaded file
  buffer: Buffer; // A Buffer of the entire file (only if `storage` is set to `MemoryStorage`)
}

@Controller('animals')
export class AnimalsController {
  constructor(private readonly animalsService: AnimalsService) {}

  private logger: Logger = new Logger(`<${AnimalsController.name}>`);


  @Post()
  create(@Body() createAnimalDto: CreateAnimalDto) {
    return this.animalsService.create(createAnimalDto);
  }
  @Get('/pages')
  async getPagesNumber(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 12,
    @Query('search') search: string
  ): Promise<number> {
    return this.animalsService.getPagesNumber(limit, search);
  }

  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 12,
    @Query('search') search: string
  ): Promise<Animal[]> {
    return this.animalsService.findAll(page, limit, search);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.animalsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnimalDto: UpdateAnimalDto) {
    return this.animalsService.update(+id, updateAnimalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.logger.log(`${id}`);
    return this.animalsService.remove(+id);
  }

  @Post('/file')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: `${process.cwd()}/frontend/${process.env.NODE_ENV === 'development' ? 'public/' : 'dist/'}/images`,
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  handleUpload(@UploadedFile() image: MulterFile) {
    return {image: image.filename}
  }
}
