import {
  Controller, Post, Body, Get, Patch, Delete, Param, Query, UploadedFiles, UseInterceptors
} from '@nestjs/common';
import { IdeaService } from './idea.service';
import { CreateIdeaDto } from './dto/create-idea.dto';
import { UpdateIdeaDto } from './dto/update-idea.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { IdeaStatus } from './idea.entity';


@Controller('idea')
export class IdeaController {
  constructor(private readonly ideaService: IdeaService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('attachments', 5))
  create(@Body() dto: CreateIdeaDto, @UploadedFiles() files: Express.Multer.File[]) {
    return this.ideaService.create(dto, files);
  }

  @Get()
  findAll(@Query() filters: any) {
    return this.ideaService.findAll(filters);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.ideaService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: UpdateIdeaDto) {
    return this.ideaService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.ideaService.remove(id);
  }



  @Patch(':id/approve')
approveIdea(@Param('id') id: number) {
  return this.ideaService.changeStatus(id, IdeaStatus.APPROVED);
}

@Patch(':id/reject')
rejectIdea(@Param('id') id: number) {
  return this.ideaService.changeStatus(id, IdeaStatus.REJECTED);
}


}
