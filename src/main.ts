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

  app.enableCors({
    origin: '*', // Allow any frontend for now (change in production)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  await app.listen(process.env.PORT || 3000);
}
bootstrap();














