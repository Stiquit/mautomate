import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('mqtt')
export class DeviceMqttController {
  @MessagePattern('connection')
  onDeviceConnected(@Payload() data) {
    console.log('Data from mqtt server connections→', data);
    return JSON.stringify(data);
  }
}
