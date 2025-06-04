// vote/vote.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vote } from './vote.entity';
import { Idea } from 'src/idea/idea.entity';
import { CreateVoteDto } from './dto/create-vote.dto';

@Injectable()
export class VoteService {
  constructor(
    @InjectRepository(Vote) private readonly repo: Repository<Vote>,
    @InjectRepository(Idea) private readonly ideaRepo: Repository<Idea>,
  ) {}

  async vote(ideaId: number, dto: CreateVoteDto) {
    const idea = await this.ideaRepo.findOne({ where: { id: ideaId } });
    if (!idea) throw new NotFoundException('Idea not found');

    const vote = this.repo.create({ isUpvote: dto.isUpvote, idea });
    return this.repo.save(vote);
  }
}

