import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from '../pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import axios, {
     AxiosInstance } from 'axios';
import { PokemonAPI } from './interface/pokemon-api.interface';
import { CreatePokemonDto } from '../pokemon/dto/create-pokemon.dto';
import { HttpAdapter } from '../common/interfaces/HttpAdapter';
import { AxiosAdapter } from '../common/adapters/axios-adapter';

@Injectable()
export class SeedService {

    //Definir solo instancia de axios

    // private Http: HttpAdapter = new AxiosHttp();


    constructor(
        @InjectModel( Pokemon.name )
        private readonly pokemonModel: Model<Pokemon>,
        private readonly Http: AxiosAdapter
    ){}


    // Seed ALL Pokemons
    async seed(){

        //Borramos registros anteriores
        await this.pokemonModel.deleteMany({});
        
        // Fetch de data de poke.api
        const data = await this.Http.HttpGet<PokemonAPI>(`https://pokeapi.co/api/v2/pokemon?limit=650`);


        //Creamos array de pokemones para insercion
        const pokemons: CreatePokemonDto[] = [];

        data.results.forEach(({name,url})=>{
            const urlPieces = url.split('/');
            const idPokedex: number = parseInt(urlPieces[urlPieces.length-2]);
            const addedPokemon: CreatePokemonDto = {
                name: name,
                idPokedex: idPokedex
            };
            pokemons.push(addedPokemon);
        });

        // Insertamos en base de dato mediante insert many de mongosee
        try {
            await this.pokemonModel.insertMany( pokemons );
        } catch (error: any) {
            if ( error.code === 11000 ){
                throw new BadRequestException("El objeto a actualizar no posee propiedades unicas");
            }
            throw new InternalServerErrorException();
        }

        return pokemons;
    }

    async test(){
        console.log( this.pokemonModel.findById('6a5548c53847dd8d64b9c089') );
        
    }



}
