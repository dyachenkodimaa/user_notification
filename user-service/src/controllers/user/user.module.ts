import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../lib/database/entities/user.entity';
import { RabbitModule } from '../../lib/services/rabbit/rabbit.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), RabbitModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
