import { IsNotEmpty, IsString, IsNumber} from "class-validator";

export class CreateItemDto {

    @IsNotEmpty()
    name: string;

    @IsNumber()
    price: number;

    @IsString()
    descripcion: string;
}
