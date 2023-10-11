import { Inject, Injectable } from '@nestjs/common';
import { MQTT_CLIENT } from '../constants/mqtt-client.symbol';
import { ClientProxy } from '@nestjs/microservices';
import {
  ACTIONS_TOPIC,
  ActionMqttPayload,
  DEVICE_LIGHT_TOPIC,
  DEVICE_SWITCH_TOPIC,
  TurnLightDevice,
  TurnSwitchDevice,
} from '@mautomate/api-interfaces';

@Injectable()
export class MqttClientService {
  constructor(@Inject(MQTT_CLIENT) private client: ClientProxy) {
    client.connect();
  }

  sendMessage<T, K>(topic: string, payload: K) {
    return this.client.send<T, K>(topic, payload);
  }

  sendSwitchPayload(payload: TurnSwitchDevice) {
    return this.sendMessage(DEVICE_SWITCH_TOPIC, payload);
    //
  }
  sendLightPayload(payload: TurnLightDevice) {
    return this.sendMessage(DEVICE_LIGHT_TOPIC, payload);
  }

  sendActionPayload(payload: ActionMqttPayload) {
    return this.sendMessage(ACTIONS_TOPIC, payload);
  }
}
