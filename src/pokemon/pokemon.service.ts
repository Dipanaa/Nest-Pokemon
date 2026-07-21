import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { isValidObjectId, Model, mongo } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';


import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { QueryParamsDto } from './dto/query-params.dto';

@Injectable()
export class PokemonService {
  
  
  constructor(

    @InjectModel( Pokemon.name )
    private readonly pokemonModel: Model<Pokemon>,
    private readonly configModule: ConfigService
  ){}
  
  // Post 
  async create(createPokemonDto: CreatePokemonDto) {

    // Normalizar nombres en minuscula para insercion
    createPokemonDto.name = createPokemonDto.name.toLowerCase();

    // Control de errores en insercion
    try {
      const pokemon = await this.pokemonModel.create( createPokemonDto );
      return pokemon;

    } catch (error: any) {
      if ( error.code === 11000 ){
        throw new BadRequestException(error.errmsg)
      }
      throw new InternalServerErrorException();
    }
  }

  // Get all
  async findAll(offset: number, limit: number) {

    const params: QueryParamsDto = {
      offset: offset || 0,
      limit: limit || this.configModule.get('getLimit')!
    };

    console.log(params.limit);


    return await this.pokemonModel.find()
    .skip(params.offset).
    limit(params.limit);

  }

  // Get Dinamico
  async findOne(term: string) {

    let pokemon: Pokemon | null = null;

    // Primera validacion de busqueda para saber si se busca por numero entero
    if( !isNaN(parseInt(term)) ){
      pokemon = await this.pokemonModel.findOne({ idPokedex: parseInt(term) });  
    }

    //Segunda Mongo id validacion
    if ( !pokemon && isValidObjectId(term) ) {
      pokemon = await this.pokemonModel.findOne({ _id: term });  
    }

    // Tercera validacion por nombre de pokemon
    if( !pokemon ){
      pokemon = await this.pokemonModel.findOne({ name: term });  
    }

    if ( !pokemon ){
      throw new NotFoundException(`Pokemon with the id or name ${term} can't be found`);
    }

    return pokemon;

  }

  // Patch
  async update(term: string, updatePokemonDto: UpdatePokemonDto) {

    const pokemon: Pokemon | null = await this.findOne(term);
    
    try {

      await pokemon.updateOne({
        ...updatePokemonDto
      });
      
    } catch (error: any) {

      if ( error.code === 11000 ){
        throw new BadRequestException("El objeto a actualizar no posee propiedades unicas")
      }

      throw new InternalServerErrorException();

    }

    return;
  }

  // Delete
  async remove(id: string) {

    // const pokemon = await this.findOne(id);
    // await pokemon.deleteOne();

    const deletedPokemon = await this.pokemonModel.findByIdAndDelete( id );

    if ( !deletedPokemon ){
      throw new NotFoundException();
    }

    return;

  }
}
