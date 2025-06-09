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
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
     type: 'mysql',
      host: 'turntable.proxy.rlwy.net',
      port: 48545,
      username: 'root',
      password: 'zYbSqlTMZwudzCCzbFiLthvLNNkyDWzC',
      database: 'railway',
      entities: [User, Idea, Comment, Vote],
      synchronize: true,
      ssl: { rejectUnauthorized: false }, // This handles SSL requirements
    }),
    UserModule,
    IdeaModule,
    CommentModule,
    VoteModule,
  ],
})
export class AppModule {
  constructor() {
    console.log('=== MYSQL DEBUG ===');
    console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL);
    console.log('DATABASE_URL value:', process.env.DATABASE_URL);
    console.log('Using individual MySQL params');
    console.log('Host: turntable.proxy.rlwy.net');
    console.log('Port: 48545');
    console.log('=== END DEBUG ===');
  }
}
