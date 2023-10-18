export const MQTT_URL = process.env['MQTT_URL'] || 'mqtt://localhost:1883';
export const MQTT_PASSWORD = process.env['MQTT_PASSWORD'] || 'password';
export const MQTT_USER = process.env['MQTT_USER'] || 'user';
export const MQTT_MICROSERVICE_CLIENT =
  process.env['MQTT_MICROSERVICE_CLIENT'] ||
  'MAUTOMATE_MQTT_MICROSERVICE_CLIENT';

export const MQTT_MODULE_CLIENT =
  process.env['MAUTOMATE_MODULE_CLIENT'] || 'MAUTOMATE_MQTT_CLIENT';
