import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import * as fs from 'fs';
import { resolve } from 'path';
import { Animal } from 'src/server/entity/animal.entity';
import { Image } from 'src/server/entity/image.entity';
import { Extlink } from 'src/server/entity/extlink.entity';
import { User } from 'src/server/entity/user.entity';
import * as bcrypt from 'bcrypt';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { image_search } from 'duckduckgo-images-api';
//import wiki from 'wikijs';

@Injectable()
export class CommandsService {
  logger: Logger = new Logger(CommandsService.name);

  constructor(private readonly dataSource: DataSource, private readonly config: ConfigService) {}
  /*
  @Command('data', {
    desc: 'Get images from Internet',
    args: {},
  })
  */
  async data() {
    //await this.getImages();
    //await this.createAnimalJSONfile();
    const userRepository = this.dataSource.getRepository(User);
    const usersCount = await userRepository.count();

    const animalRepository = this.dataSource.getRepository(Animal);
    const animalsCount = await animalRepository.count();

    if (animalsCount === 0 && usersCount === 0) {
      await this.deleteDataFromTables();
      await this.storeData();
      await this.createSeeds();
      this.logger.log('Data stored successfully');
    }
    //_cli.success('message');
  }

  async findImage(query) {
    const apiKey = this.config.get<string>('GOOGLE_CUSTOM_SEARCH_API_KEY');
    const cx = this.config.get<string>('GOOGLE_CUSTOM_SEARCH_CX');

    const  image_finder = require("image-search-engine")
    this.logger.log('url', await image_finder.find('Elephant', { size: "medium" }))
    const results = await image_search({ query: "birds", moderate: true });
    this.logger.debug({ results });
    return false;
    /*
    this.logger.log("Find image", query);
    const GoogleImages = require('google-images');
    const client = new GoogleImages( cx, apiKey);

    const result = (await client.search(query));
    this.logger.debug(result?.[0]?.url);
    return result?.[0]?.url;
    */
    /*
    const { getJson } = require("serpapi");
    getJson({
      engine: "google",
      api_key: this.config.get<string>('SERP_API_KEY'), // Get your API_KEY from https://serpapi.com/manage-api-key
      q: query,
      location: "Austin, Texas"
    }, (json) => {
      this.logger.log(json["organic_results"]);
    });
    */
    /*
    const url = `https://www.googleapis.com/customsearch/v1`;

    function buildUrl(baseUrl, params) {
      const queryString = new URLSearchParams(params).toString();
      return `${baseUrl}?${queryString}`;
    }
    
    // Example usage
    const baseUrl = 'https://www.googleapis.com/customsearch/v1';
    const params = {
      key: apiKey,
      cx: cx,
      q: 'Ara malý',
      searchType: 'image',
      num: 5,
      lr: 'lang_cs'
    };
    const buildedUrl = buildUrl(baseUrl, params)
    Logger.log({buildedUrl})

    try {
      const response = await axios.get(url,
        {
          params: {
            key: apiKey,
            cx: cx,
            q: query,
            searchType: 'image', // Specifies that we are looking for images
            num: 5, // Number of results to return (max 10 per request)
            lr: 'lang_cs'
          }
        }
      );
      const items = response.data.items;
      Logger.debug(response.data)
      if (items && items.length > 0) {
        // Return the first image URL
        
        return (items.map(item => item.link))[0];
      } else {
        console.log('No images found');
        return [];
      }
    } catch (error) {
      console.error('Error fetching image:', error);
    }
    */
  }

  async getImages() {
    const image_finder = require('image-search-engine');

    const downloadImage = (url, image_path) =>
      axios({
        url,
        responseType: 'stream',
      }).then(
        (response) =>
          new Promise<void>((resolve, reject) => {
            response.data
              .pipe(fs.createWriteStream(image_path))
              .on('finish', () => resolve())
              .on('error', (e) => reject(e));
          }),
      );

    const namesObj = JSON.parse(
      fs.readFileSync(`${process.cwd()}/src/server/app/data/seed/animals/names.json`, 'utf8'),
    );

    const latinnamesObj = JSON.parse(
      fs.readFileSync(
        `${process.cwd()}/src/server/app/data/seed/animals/latinnames.json`,
        'utf8',
      ),
    );

    const imagesObj = [];

    fs.rmSync(`${process.cwd()}/src/client/public/images/`, {
      recursive: true,
      force: true,
    });

    fs.mkdir(`${process.cwd()}/src/client/public/images/`, (err) => {
      if (err) {
        return console.error(err + 'Directory not created!');
      }
      console.log('Directory created successfully!');
    });

    await Promise.all(
      latinnamesObj.map(async (animal, index) => {
        Logger.log(animal);
        try {
          const url = await this.findImage(animal);
          //Logger.log({ url });
          //Logger.debug({ url });
          const imageName = `${animal}${uuidv4()}.jpg`;
          if (url) {
            await downloadImage(
              `${url}`,
              `${process.cwd()}/src/client/public/images/${imageName}`,
            ).catch((e) => console.log('Error: ', e));
          }
          /**/
          imagesObj.push({
            name: namesObj[index],
            latinname: animal,
            image: imageName,
          });
        } catch (error) {
          console.error('Error:', error);
        }
      }),
    );

    fs.unlink(process.cwd() + '/src/server/app/data/seed/animals/images.json', function (err) {
      if (err) throw err;
      // if no error, file has been deleted successfully
      console.log('images.json deleted!');
    });

    fs.open(process.cwd() + '/src/server/app/data/seed/animals/images.json', 'w', function (err, file) {
      if (err) throw err;
      console.log('Saved!');
    });

    fs.writeFileSync(
      process.cwd() + '/src/server/app/data/seed/animals/images.json',
      JSON.stringify(imagesObj, null, 4),
      'utf8',
    );
  }

  /*
  @Command('animal:json', {
    desc: 'Get images from Internet',
    args: {},
  })
  */
  async createAnimalJSONfile() {
    const imagesObj = JSON.parse(
      fs.readFileSync(resolve('./src/server/app/data/seed/animals/images.json'), 'utf8'),
    );

    //_cli.info(JSON.stringify(imagesObj));
    const wiki = require('wikijs').default;

    const animalObj = [];

    try {
      await Promise.all(
        imagesObj.map(async (data) => {
          try {
            let content: any = [];
            //_cli.info('Inside the Promise');
            wiki({ apiUrl: 'https://cz.wikipedia.org/w/api.php' })
              .page(data.name)
              .then(async (page) => {
                //content = await page.content();
               // _cli.success('Inside Wiki');
                content = await page.chain().summary().extlinks().request();
                animalObj.push({
                  name: data.name,
                  latinname: data.latinname,
                  image: data.image,
                  extract: content.extract,
                  extlinks: [...content.extlinks],
                });
              })
              .catch((e) => /*_cli.error(e)*/this.logger.error(e))
              .finally(() => {
                //_cli.info(JSON.stringify(animalObj));
                fs.writeFile(
                  './src/server/app/data/seed/animals/animals.json',
                  JSON.stringify(animalObj, null, 4),
                  'utf8',
                  () => console.log('Mkdir Done'),
                );
              });
          } catch (e) {
            console.error('Error: ', e);
          } finally {
          }
        }),
      );
    } catch (e) {
      console.error(e);
    }
  }

  async deleteDataFromTables() {
    const conn = this.dataSource;

    const entities = conn.entityMetadatas;

    for (const entity of entities) {
      const repository = conn.getRepository(entity.name); // Get repository
      await repository.clear(); // Clear each entity table's content
    }
  }

  /*
  @Command('store:data', {
    desc: 'Store intial data',
    args: {},
  })
  */
  async storeData() {
    const animalsObj = JSON.parse(
      fs.readFileSync(resolve('./src/server/app/data/seed/animals/animals.json'), 'utf8'),
    );
    //_cli.success(JSON.stringify(animalsObj));
    for (const _animal of animalsObj) {
      //const index = animalsObj.indexOf(_animal);
      const animal = new Animal();
      animal.name = _animal.name;
      animal.latinname = _animal.latinname;
      animal.description = _animal.extract;
      const image = new Image();
      image.urlName = _animal.image;

      //_cli.info(_animal.image);
      try {
        await image.save();
      } catch (e: any) {
        //_cli.error(e);
      }

      //await conn.manager.save(image);

      animal.images = [image];
      //console.log(animal.images);
      animal.extlinks = [];

      for (const extlink of _animal.extlinks) {
        const extLink = new Extlink();
        extLink.link = extlink;
        try {
          await extLink.save();
        } catch (e: any) {
          //_cli.error(e);
        }

        //await conn.manager.save(extLink);
        animal.extlinks.push(extLink);
      }
      //console.log(animal.extlinks);
      //await conn.manager.save(animal);
      try {
        await animal.save();
      } catch (e: any) {
        //_cli.error(e);
      }
    }
  }

  /*
  @Command('seeds', {
    desc: 'Create seeds',
    args: {},
  })
  */
  
  async createSeeds(): Promise<void> {
    const salt = await bcrypt.genSalt();

    const user = new User();

    user.username = 'user';
    user.provider = 'app';
    user.salt = salt;
    user.password = await bcrypt.hash('123456', salt);

    try {
      await user.save();
      //_cli.success('success');
    } catch (error: any) {
      if (error.errno === 19) {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
