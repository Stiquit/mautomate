import { Injectable, UnauthorizedException } from '@nestjs/common';
import { MqttClientService } from '../../mqtt/services/mqtt-client.service';
import {
  ActionMqttPayload,
  ActionType,
  DeviceMQTTResponse,
  DeviceState,
  IDevice,
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
    const { userId, deviceId, state, pin, type } = payload;

    await this.validateDeviceOwnership(userId, deviceId);
    this.mqttClientService.sendSwitchPayload(payload).subscribe();

    const payloadDeviceType = state ? ActionType.TurnOn : ActionType.TurnOff;
    this.sendActionOverMQTT(deviceId, userId, payloadDeviceType);
  }

  async turnLightDevice(payload: TurnLightDevice) {
    const { userId, deviceId, state } = payload;
    await this.validateDeviceOwnership(userId, deviceId);

    this.mqttClientService.sendLightPayload(payload).subscribe();
    const payloadDeviceType = state ? ActionType.TurnOn : ActionType.TurnOff;
    this.sendActionOverMQTT(deviceId, userId, payloadDeviceType);
  }

  async updateDeviceState(data: DeviceMQTTResponse) {
    const { deviceId, state } = data;
    const deviceState = state ? DeviceState.On : DeviceState.Off;
    return this.deviceService.updateState(deviceId, deviceState);
  }

  sendActionOverMQTT(deviceId: string, userId: string, type: ActionType) {
    const actionPayload: ActionMqttPayload = {
      deviceId,
      userId,
      type,
    };
    this.mqttClientService.sendActionPayload(actionPayload).subscribe();
  }

  private async validateDeviceOwnership(userId: string, deviceId: string) {
    const userDevices = await this.deviceService.findUserDevices(userId);
    const device = await this.deviceService.findById(deviceId);

    if (!this.userOwnsIoTDevice(userDevices, device)) {
      throw new UnauthorizedException('Not owner of device');
    }
  }

  private userOwnsIoTDevice(userDevices: IDevice[], device: IDevice) {
    return userDevices.some(
      (userDevices) =>
        userDevices.name === device.name && userDevices.pin === device.pin
    );
  }
}
