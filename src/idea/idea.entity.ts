// idea/idea.entity.ts
import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Comment } from 'src/comment/comment.entity';

@Entity()
export class Idea {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column()
  category: string;

  @Column()
  impactLevel: string;

  @Column('simple-array', { nullable: true })
  hashtags: string[];

  @Column({ type: 'json', nullable: true })
  attachmentUrls: string[];

  @Column({ nullable: true })
  requiredResources: string;

  @Column()
  anonymousId: string;

  @ManyToOne(() => User, { nullable: true })
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Comment, (comment) => comment.ideaId, {cascade: true})
  comments: Comment[];
}
