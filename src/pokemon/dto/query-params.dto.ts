import { IsNumber, IsOptional, IsPositive, Min, MinLength } from "class-validator";


export class QueryParamsDto{

    @IsOptional()
    @IsNumber()
    @Min(1)
    limit!: number;

    @IsOptional()
    @IsPositive()
    offset!: number;

}    

