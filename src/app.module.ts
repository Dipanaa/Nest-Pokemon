import { Schema } from '@nestjs/mongoose';
import { join } from 'path'; // Node

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule} from '@nestjs/mongoose';

import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { useConfigEnv } from './config/env.config';
import { JoiValidationSchema } from './config/joi-validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [  useConfigEnv ],
      validationSchema: JoiValidationSchema
    }), // las variables de entorno deben estar a nivel de raiz
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,"..","public")
    }),

    MongooseModule.forRoot( process.env.MONGODB!, {
      dbName: 'pokemons'
    }),
    
    PokemonModule,
    CommonModule,
    SeedModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {


    
}
