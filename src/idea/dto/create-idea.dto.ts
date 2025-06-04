import { IsString, IsOptional, IsArray } from 'class-validator';

export class CreateIdeaDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  category: string;

  @IsString()
  impactLevel: string;

  @IsArray()
  @IsOptional()
  hashtags: string[];

  @IsOptional()
  requiredResources: string;
}
