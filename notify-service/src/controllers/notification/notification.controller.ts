import { EventPattern, Payload } from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import { UserPayloadInterface } from './interfaces/notification.interface';

@Controller()
export class NotificationController {
  constructor() {}
  @EventPattern('users')
  async getNotifications(@Payload() data: string) {
    try {
      const message = JSON.parse(data) as UserPayloadInterface;
      const abortController = new AbortController();
      const timeoutId = setTimeout(() => abortController.abort(), 30000);
      const response = await fetch(process.env.WEBHOOK_URL, {
        method: 'POST',
        body: JSON.stringify({
          user: message.name,
          surname: message.surname,
          message: `You have registration on ${message.add_time}`,
        }),
        signal: abortController.signal,
      });
      clearTimeout(timeoutId);
      console.log(response);
      console.log('Push notification sent:');
    } catch (err) {
      console.warn('Error while sending notification', err);
    }
  }
}
