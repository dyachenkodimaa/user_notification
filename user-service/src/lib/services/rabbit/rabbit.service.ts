import { Inject, Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Connection, connect } from 'amqplib';
import { getEnvVariable } from '../../utils/env';

@Injectable()
export class RabbitService implements OnModuleInit {
  private connection: Connection;
  private readonly logger = new Logger(RabbitService.name);

  constructor(
    @Inject('RABBIT_SERVICE') private readonly rabbitService: ClientProxy,
  ) {}

  sendEvent(event): void {
    this.rabbitService.emit('users', JSON.stringify(event));
  }

  async onModuleInit(): Promise<any> {
    const rabbitmqUrl = getEnvVariable('RABBITMQ_URL');
    let retryAttempts = 0;
    const maxRetryAttempts = 5;
    const retryDelay = 7000;

    const connectToRabbitMQ = async (): Promise<void> => {
      try {
        this.connection = await connect(rabbitmqUrl);
        this.logger.log('Successfully connected to RabbitMQ');
        await this.rabbitService.connect();

        const channel = await this.connection.createChannel();
        await channel.assertExchange('dlx_exchange', 'direct', {
          durable: true,
        });
        await channel.assertQueue('delayed_queue', { durable: true });
        await channel.bindQueue(
          'delayed_queue',
          'dlx_exchange',
          'delayed_queue',
        );
      } catch (error) {
        this.logger.error(`Error connecting to RabbitMQ: ${error.message}`);

        retryAttempts++;
        if (retryAttempts <= maxRetryAttempts) {
          this.logger.log(
            `Retrying connection... Attempt ${retryAttempts} of ${maxRetryAttempts}`,
          );
          setTimeout(connectToRabbitMQ, retryDelay);
        } else {
          this.logger.error(
            'Max retry attempts reached. Unable to connect to RabbitMQ.',
          );
        }
      }
    };

    await connectToRabbitMQ();
  }
}
