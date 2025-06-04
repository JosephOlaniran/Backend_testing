import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { Idea } from 'src/idea/idea.entity';
import { IdeaModule } from 'src/idea/idea.module';



@Module({
  imports: [TypeOrmModule.forFeature([Comment, Idea]), IdeaModule
,],
  controllers: [CommentController],
  providers: [CommentService]
})
export class CommentModule {}
