import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpCode, HttpStatus, Query, DefaultValuePipe } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { ParseMongoIdPipe } from '../common/pipes/parse-mongo-id-pipe/parse-mongo-id-pipe.pipe';
import { QueryParamsDto } from './dto/query-params.dto';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Post()
  create(@Body() createPokemonDto: CreatePokemonDto) {
    return this.pokemonService.create(createPokemonDto);
  }


  // // Esta es una primera opcion para endpoint rapidos y sin tantas validaciones por parametros
  // @Get()
  // findAll(
  //   @Query('offset', new DefaultValuePipe(0),ParseIntPipe) offset: number, 
  //   @Query('limit',new DefaultValuePipe(0), ParseIntPipe) limit: number 
  // ) {
  //   return this.pokemonService.findAll(offset,limit);
  // }


  // Esta es una primera opcion para endpoint rapidos y sin tantas validaciones por parametros
  @Get()
  findAll(
    @Query() queryParamsDto: QueryParamsDto,  
  ) {
    return this.pokemonService.findAll(queryParamsDto.offset,queryParamsDto.limit); 
  }

  @Get(':term')
  findOne(@Param('term')term: string) {
    return this.pokemonService.findOne(term);
  }

  @Patch(':id')
  async update(@Param('id') term: string, @Body() updatePokemonDto: UpdatePokemonDto) {
    return await this.pokemonService.update(term, updatePokemonDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseMongoIdPipe) id: string) {
    return await this.pokemonService.remove(id);
  }
}
