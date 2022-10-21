import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CandidatosService } from './candidatos.service';
import { CreateCandidatoDto } from './dto/create-candidato.dto';
import { UpdateCandidatoDto } from './dto/update-candidato.dto';

@ApiTags('candidatos')
@Controller('candidatos')
export class CandidatosController {
  constructor(private readonly candidatosService: CandidatosService) {}

  @Post()
  create(@Body() createCandidatoDto: CreateCandidatoDto) {
    return this.candidatosService.create(createCandidatoDto);
  }

  @Get()
  findAll() {
    return this.candidatosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.candidatosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCandidatoDto: UpdateCandidatoDto) {
    return this.candidatosService.update(+id, updateCandidatoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.candidatosService.remove(+id);
  }
}
