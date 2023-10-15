import { Inject, Injectable } from '@nestjs/common';
import { MQTT_CLIENT } from '../constants/mqtt-client.symbol';
import { ClientProxy, MqttRecordBuilder } from '@nestjs/microservices';
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

  buildRecord<T>(payload: T) {
    const recordBuilder: MqttRecordBuilder<T> = new MqttRecordBuilder<T>();
    return recordBuilder.setData(payload).setQoS(1).build();
  }

  sendMessage<T, K>(topic: string, payload: K) {
    const record = this.buildRecord<K>(payload);
    return this.client.send<T>(topic, record);
  }

  sendSwitchPayload(payload: TurnSwitchDevice) {
    return this.sendMessage(DEVICE_SWITCH_TOPIC, payload);
  }
  sendLightPayload(payload: TurnLightDevice) {
    return this.sendMessage(DEVICE_LIGHT_TOPIC, payload);
  }

  sendActionPayload(payload: ActionMqttPayload) {
    return this.sendMessage(ACTIONS_TOPIC, payload);
  }
}
