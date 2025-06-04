// src/idea/idea.controller.ts

import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerConfig } from 'src/config/multer.config';
import { CreateIdeaDto } from './idea/dto/create-idea.dto';
import { IdeaService } from './idea/idea.service';



@Controller('idea')
export class IdeaController {
  constructor(private readonly ideaService: IdeaService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('attachments', 5, multerConfig))
  create(
    @Body() dto: CreateIdeaDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.ideaService.create(dto, files);
  }
}

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();














