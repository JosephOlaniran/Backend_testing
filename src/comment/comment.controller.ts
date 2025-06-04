import { Controller, Post, Param, Body, Get, Query } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post(':ideaId')
  create(@Param('ideaId') ideaId: number, @Body() dto: CreateCommentDto) {
    return this.commentService.create(ideaId, dto);
  }

  @Get(':ideaId')
  async findByIdea(@Param('ideaId') ideaId: string) {
    return this.commentService.findByIdea(ideaId);
  }
}
