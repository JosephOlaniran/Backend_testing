import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async login(employeeId: string, password: string) {
    const user = await this.repo.findOne({ where: { employeeId } });
    /*if (!user || user.password !== password) {
      throw new UnauthorizedException('Invalid credentials');
    }*/
    return { message: 'Login successful' };
  }
}
