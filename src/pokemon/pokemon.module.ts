import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { model } from 'mongoose';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      {
        name: Pokemon.name, // NO ES EL NOMBRE DE LA PROPERTY SINO DE LA HERENCIA DE DOCUMENT
        schema: PokemonSchema
      }
    ])
  ],
  exports:[MongooseModule]
})
export class PokemonModule {}
