import {
  ActionType,
  DeviceAction,
  DeviceType,
  LightDeviceAction,
  RoutineAction,
  TurnLightDevice,
  TurnSwitchDevice,
  WaitAction,
} from '@mautomate/api-interfaces';
import { Injectable, Logger } from '@nestjs/common';
import { MqttClientService } from '../../mqtt/services/mqtt-client.service';
import { DeviceService } from '../../device/services/device.service';
import {
  HumanizeDurationLanguage,
  HumanizeDuration,
} from 'humanize-duration-ts';
@Injectable()
export class RoutineIoTService {
  private logger = new Logger(RoutineIoTService.name);
  private langService = new HumanizeDurationLanguage();
  private humanizer = new HumanizeDuration(this.langService);

  constructor(
    private mqttClientService: MqttClientService,
    private deviceService: DeviceService
  ) {}

  handleRoutineActions(userId: string, actions: RoutineAction[]) {
    return async () => {
      if (!userId) {
        return;
      }
      for (const action of actions) {
        if (this.isDeviceAction(action)) {
          await this.handleDeviceAction(userId, action);
          continue;
        }

        if (this.isLightAction(action)) {
          await this.handleLightAction(userId, action);
          continue;
        }

        await this.handleWaitAction(action);
      }
    };
  }

  handleWaitAction(action: WaitAction) {
    const { waitFor } = action;
    this.logger.log(`Applying delay of: ${this.humanizer.humanize(waitFor)}`);
    return new Promise((resolve) => setTimeout(resolve, waitFor));
  }

  async handleDeviceAction(userId: string, action: DeviceAction) {
    const { deviceId, state } = action;
    const device = await this.deviceService.findById(deviceId);
    const { _id, pin, type } = device;
    const payload: TurnSwitchDevice = {
      userId,
      deviceId: String(_id),
      pin,
      state,
      type,
    };

    this.mqttClientService.sendSwitchPayload(payload).subscribe();
    this.logger.log(`Turning device ${device.name} ${state ? 'on' : 'off'} `);
  }

  async handleLightAction(userId: string, action: LightDeviceAction) {
    const { deviceId, state, red, blue, brightness, green } = action;
    const device = await this.deviceService.findById(deviceId);
    const { _id, pin } = device;
    const payload: TurnLightDevice = {
      userId,
      deviceId: String(_id),
      pin,
      state,
      type: DeviceType.Light,
      red,
      blue,
      brightness,
      green,
    };
    this.logger.log(`Turning device ${device.name} ${state ? 'on' : 'off'} `);
    this.mqttClientService.sendLightPayload(payload).subscribe();
  }

  isDeviceAction(action: RoutineAction): action is DeviceAction {
    return 'deviceId' in action;
  }

  isLightAction(action: RoutineAction): action is LightDeviceAction {
    return 'red' in action;
  }
}
