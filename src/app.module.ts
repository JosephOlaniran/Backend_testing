// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { Idea } from './idea/idea.entity';
import { Comment } from './comment/comment.entity';
import { Vote } from './vote/vote.entity';
import { UserModule } from './user/user.module';
import { IdeaModule } from './idea/idea.module';
import { CommentModule } from './comment/comment.module';
import { VoteModule } from './vote/vote.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Mysql@259',
      database: 'idea_mine',
      entities: [User, Idea, Comment, Vote],
      synchronize: true,
    }),
    UserModule,
    IdeaModule,
    CommentModule,
    VoteModule,
  ],
})
export class AppModule {}
