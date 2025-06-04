// comment/comment.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Idea } from 'src/idea/idea.entity';

@Injectable()
export class CommentService {
  
  constructor(
    @InjectRepository(Comment) private readonly repo: Repository<Comment>,
    @InjectRepository(Idea) private readonly ideaRepo: Repository<Idea>,
  ) {}

  async create(ideaId: number, dto: CreateCommentDto) {
    const idea = await this.ideaRepo.findOne({ where: { id: ideaId } });
    if (!idea) throw new NotFoundException('Idea not found');

    const comment = this.repo.create({ text: dto.text, idea });
    return this.repo.save(comment);
  }

  async findByIdea(ideaId: string): Promise<any[]> {
    // Verify parent exists
    const idea = await this.ideaRepo.findOne({
      where: { id: Number(ideaId) },
    });

    if (!idea) {
      throw new NotFoundException('Idea not found');
    }

    const data = await this.repo.find({
      where: { ideaId },
      relations: ['idea'],
    });

    const filteredData = data.map((x) => {
      const { idea, ...rest } = x;
      return rest;
    });

    return filteredData;
  }




}

