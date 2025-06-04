import { Module } from '@nestjs/common';
import { VoteController } from './vote.controller';
import { VoteService } from './vote.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vote } from './vote.entity';
import { Idea } from 'src/idea/idea.entity';


@Module({
   imports: [TypeOrmModule.forFeature([Vote, Idea])],
  controllers: [VoteController],
  providers: [VoteService]
})
export class VoteModule {}
