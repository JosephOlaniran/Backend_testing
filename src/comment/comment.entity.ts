// comment/comment.entity.ts
import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Idea } from 'src/idea/idea.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  text: string;

  @ManyToOne(() => Idea, (idea) => idea.comments)
  @JoinColumn({ name: 'ideaId' })
  idea: Idea;

  /*@ManyToOne(() => Idea, (idea) => idea.id)
  idea: Idea;*/

   @Column('ideaId')
  ideaId: string;

  @CreateDateColumn()
  createdAt: Date;
}

