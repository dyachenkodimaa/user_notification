import * as moment from 'moment';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { UserInterface } from '../interfaces/database.interface';

@Entity({ name: 'users' })
export class UserEntity implements UserInterface {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column({ type: 'varchar', length: 255 })
  add_time = moment().format('yyyy-MM-DD HH:mm:ss.SSS');
}
