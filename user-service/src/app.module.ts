import { Module } from '@nestjs/common';
import { DatabaseModule } from './lib/database/database.module';
import { ConfigModule } from './lib/config/config.module';
import { UserModule } from './controllers/user/user.module';
import { RabbitModule } from './lib/services/rabbit/rabbit.module';

@Module({
  imports: [ConfigModule, DatabaseModule, UserModule, RabbitModule],
})
export class AppModule {}
