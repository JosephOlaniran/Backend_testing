// idea/idea.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Idea } from 'src/idea/idea.entity';
import { CreateIdeaDto } from './dto/create-idea.dto';
import { UpdateIdeaDto } from './dto/update-idea.dto';
import { v4 as uuidv4 } from 'uuid';
import { IdeaStatus } from './idea.entity';

@Injectable()
export class IdeaService {
  findOne(id: number) {
    return this.repo.findOne({ where: { id } });
  }
  constructor(
    @InjectRepository(Idea) private readonly repo: Repository<Idea>,
  ) {}

  async create(dto: CreateIdeaDto, files: Express.Multer.File[]) {
    const idea = this.repo.create(dto);
    idea.anonymousId = `anon-${uuidv4().slice(0, 8)}`;

    if (files && files.length > 0) {
      idea.attachmentUrls = files.map((file) => file.filename);
    }

    return this.repo.save(idea);
  }

  async findAll(filters: any) {
    const query = this.repo.createQueryBuilder('idea');

    if (filters.category) {
      query.andWhere('idea.category = :category', { category: filters.category });
    }

    if (filters.search) {
      query.andWhere(
        '(idea.title LIKE :search OR idea.description LIKE :search)',
        { search: `%${filters.search}%` },
      );
    }

    return query.getMany();
  }

  async update(id: number, dto: UpdateIdeaDto) {
    const idea = await this.repo.findOne({ where: { id } });
    if (!idea) throw new NotFoundException('Idea not found');

    Object.assign(idea, dto);
    return this.repo.save(idea);
  }

  async remove(id: number) {
    const idea = await this.repo.findOne({ where: { id } });
    if (!idea) throw new NotFoundException('Idea not found');

    return this.repo.remove(idea);
  }


  async changeStatus(id: number, status: IdeaStatus) {
  const idea = await this.repo.findOneBy({ id });
  if (!idea) throw new NotFoundException('Idea not found');

  idea.status = status;  // now no error
  return await this.repo.save(idea);
}

}
