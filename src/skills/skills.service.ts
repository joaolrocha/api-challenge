import { Injectable } from '@nestjs/common';

@Injectable()
export class SkillsService {
  private readonly skills: string[] = [
    'Git', 'React', 'PHP', 'NodeJS', 'DevOps', 'Banco de Dados', 'TypeScript'
  ];

  findAll(): string[] {
    return this.skills;
  }
}
