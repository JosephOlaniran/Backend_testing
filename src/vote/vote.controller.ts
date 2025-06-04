import { Controller, Post, Param, Body } from '@nestjs/common';
import { VoteService } from './vote.service';
import { CreateVoteDto } from './dto/create-vote.dto';

@Controller('vote')
export class VoteController {
  constructor(private readonly voteService: VoteService) {}

  @Post(':ideaId')
  vote(@Param('ideaId') ideaId: number, @Body() dto: CreateVoteDto) {
    return this.voteService.vote(ideaId, dto);
  }
}
