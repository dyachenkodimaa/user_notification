import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../lib/database/entities/user.entity';
import { RabbitService } from '../../lib/services/rabbit/rabbit.service';
import { UserInterface } from '../../lib/database/interfaces/database.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly rabbitService: RabbitService,
  ) {}

  async createUser(
    body: Pick<UserInterface, 'name' | 'surname'>,
  ): Promise<UserEntity> {
    try {
      const userEntity = new UserEntity();
      userEntity.name = body.name;
      userEntity.surname = body.surname;

      await this.insert(userEntity);

      await this.rabbitService.sendEvent(userEntity);
      return userEntity;
    } catch (err) {
      console.warn(`Error while creating user: ${body.name}`, err);
    }
  }

  private async insert(entity: UserEntity): Promise<void> {
    try {
      await this.userRepository.insert(entity);
    } catch (err) {
      console.warn(`Error while inserting User entity ${entity.name} - ${err}`);
    }
  }
}
