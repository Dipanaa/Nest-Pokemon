import { Module } from '@nestjs/common';
import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';
import { PokemonModule } from '../pokemon/pokemon.module';
import { CommonModule } from '../common/common.module';


@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports:[
    PokemonModule,
    CommonModule
  ]
})
export class SeedModule {}
