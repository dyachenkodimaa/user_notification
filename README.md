## user-service

PORT=3000
RABBITMQ_URL=amqp://guest:guest@rabbitmq:5672
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=nebula
DATABASE_PORT=5432
DATABASE_HOST=postgres-nebula
DATABASE_NAME=nebula
DATABASE_PASSWORD=postgres
DATABASE_USER=postgres

NOTIFICATION_DELAY=60000

## notify-service

PORT=3001
RABBITMQ_URL=amqp://guest:guest@rabbitmq:5672

# put your url
WEBHOOK_URL=https://webhook.site/
