import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";

@Entity('employees')
@Unique(['cpf'])
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100 })
  email: string;

  @Column({ length: 14 })
  cpf: string;

  @Column({ nullable: true })
  phone?: string;

  @Column('text', { array: true })
  skills: string[];
  
  @Column({ default: 'Não validado' })
  status: string;

  @Column({ type: 'timestamp', nullable: true })
  validationDate?: Date;
}