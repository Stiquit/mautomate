import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MQTT_CLIENT } from './constants/mqtt-client.symbol';
import { MQTT_PASSWORD, MQTT_URL, MQTT_USER } from '@mautomate/api-interfaces';
import { MqttClientService } from './services/mqtt-client.service';
import { DeviceMqttController } from './controllers/mqtt-server.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: MQTT_CLIENT,
        transport: Transport.MQTT,
        options: {
          url: MQTT_URL,
          password: MQTT_PASSWORD,
          username: MQTT_USER,
          clientId: 'MAUTOMATE_BACKEND_CLIENT',
        },
      },
    ]),
  ],
  providers: [MqttClientService],
  controllers: [DeviceMqttController],
  exports: [MqttClientService],
})
export class MqttModule {}
