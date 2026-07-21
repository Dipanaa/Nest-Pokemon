import { Body, Controller, Get } from '@nestjs/common';
import { SeedService } from './seed.service';
import { Pokemon } from '../pokemon/entities/pokemon.entity';

@Controller('seed')
export class SeedController {

    constructor(private seedService: SeedService){}

    @Get()
    async executeSeed(@Body() pokemonsList){
        return await this.seedService.seed();
    }
}
