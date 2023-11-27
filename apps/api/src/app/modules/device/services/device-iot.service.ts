import { Injectable } from '@nestjs/common';
import { MqttClientService } from '../../mqtt/services/mqtt-client.service';
import {
  ActionMqttPayload,
  ActionType,
  DeviceMQTTResponse,
  DeviceState,
  TurnLightDevice,
  TurnSwitchDevice,
} from '@mautomate/api-interfaces';
import { DeviceService } from './device.service';

@Injectable()
export class DeviceIoTService {
  constructor(
    private mqttClientService: MqttClientService,
    private deviceService: DeviceService
  ) {}

  async turnSwitchDevice(payload: TurnSwitchDevice) {
    const { userId, deviceId } = payload;
    await this.deviceService.validateDeviceOwnership(userId, deviceId);
    this.mqttClientService.sendSwitchPayload(payload).subscribe();
  }

  async turnLightDevice(payload: TurnLightDevice) {
    const { userId, deviceId } = payload;
    await this.deviceService.validateDeviceOwnership(userId, deviceId);
    this.mqttClientService.sendLightPayload(payload).subscribe();
  }

  async updateDeviceState(data: DeviceMQTTResponse) {
    const { deviceId, state } = data;
    const deviceState = state ? DeviceState.On : DeviceState.Off;
    this.mqttClientService
      .sendActionPayload({
        ...data,
        type: data.state ? ActionType.TurnOn : ActionType.TurnOff,
      })
      .subscribe();
    return this.deviceService.updateState(deviceId, deviceState);
  }
}
