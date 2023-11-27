import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { DeviceIoTService } from '../services/device-iot.service';
import { DeviceGateway } from './device.gateway';
import {
  DEVICE_RESPONSE_CHANNEL,
  DeviceMQTTResponse,
} from '@mautomate/api-interfaces';

@Controller('device-iot')
export class DeviceIotController {
  constructor(
    private deviceIoTService: DeviceIoTService,
    private deviceGateway: DeviceGateway
  ) {}

  @MessagePattern(DEVICE_RESPONSE_CHANNEL)
  responseFromDevice(@Payload() data: DeviceMQTTResponse) {
    this.deviceGateway.server.emit(DEVICE_RESPONSE_CHANNEL, data);
    return this.deviceIoTService.updateDeviceState(data);
  }
}
