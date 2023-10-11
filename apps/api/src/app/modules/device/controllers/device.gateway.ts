import {
  DEVICE_LIGHT_CHANNEL,
  DEVICE_SWITCH_CHANNEL,
  TurnLightDevice,
  TurnSwitchDevice,
} from '@mautomate/api-interfaces';
import { Logger } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { DeviceIoTService } from '../services/device-iot.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class DeviceGateway {
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger(DeviceGateway.name);
  constructor(private deviceIoTService: DeviceIoTService) {}

  @SubscribeMessage(DEVICE_SWITCH_CHANNEL)
  turnSwitchDevice(client: any, payload: TurnSwitchDevice) {
    this.logger.log('Message on: ', DEVICE_SWITCH_CHANNEL);
    return this.deviceIoTService.turnSwitchDevice(payload);
  }

  @SubscribeMessage(DEVICE_LIGHT_CHANNEL)
  turnSLightDevice(client: any, payload: TurnLightDevice) {
    this.logger.log('Message on: ', DEVICE_LIGHT_CHANNEL);
    return this.deviceIoTService.turnLightDevice(payload);
  }
}
