import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsNumber, IsOptional } from 'class-validator';
import { Expose, Transform } from 'class-transformer';
import { TimestampEntity } from '../../generics/timestamp.entity';
import { User } from '../../user/entities/user.entity';
import { Skill } from '../../skill/entities/skill.entity';

@Entity('cv')
export class Cv extends TimestampEntity {
  @PrimaryGeneratedColumn()
  @Expose({ groups: ['user'] })
  id: number;
  @Column({
    length: 50,
  })
  @Expose({ groups: ['user'] })
  name: string;
  @Column({
    length: 50,
  })
  firstname: string;
  @Column({
    length: 50,
  })
  @Expose({ groups: ['admin'] })
  job: string;
  @Column({
    length: 50,
  })
  @Expose({ groups: ['admin'] })
  path: string;
  @Column({
    length: 50,
  })
  cin: string;
  @Column()
  age: number;
  @ManyToOne((targetTarget) => User, (user) => user.cvs, {})
  user: User;

  @ManyToMany(() => Skill, (skill) => skill.cvs, {})
  @JoinTable({
    name: 'cv_skill',
    joinColumn: {
      name: 'cv',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'skill',
      referencedColumnName: 'id',
    },
  })
  skills: Skill[];
}
