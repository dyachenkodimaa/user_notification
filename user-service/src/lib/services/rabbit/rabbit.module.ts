import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RabbitService } from './rabbit.service';
import { getEnvVariable } from '../../utils/env';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'RABBIT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [getEnvVariable('RABBITMQ_URL')],
          queue: 'users',
          queueOptions: {
            durable: false,
            arguments: {
              'x-message-ttl': +getEnvVariable('NOTIFICATION_DELAY'),
              'x-dead-letter-exchange': 'dlx_exchange',
              'x-dead-letter-routing-key': 'delayed_queue',
            },
          },
        },
      },
    ]),
  ],
  providers: [RabbitService],
  exports: [RabbitService],
})
export class RabbitModule {}
