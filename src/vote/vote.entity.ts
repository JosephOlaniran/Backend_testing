// vote/vote.entity.ts
import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Idea } from 'src/idea/idea.entity';

@Entity()
export class Vote {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  isUpvote: boolean;

  @ManyToOne(() => Idea, (idea) => idea.id)
  idea: Idea;
}

