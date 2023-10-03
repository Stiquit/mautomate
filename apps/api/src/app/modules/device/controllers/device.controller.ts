import { Controller, Get, Param } from '@nestjs/common';
import { DeviceService } from '../services/device.service';

@Controller('device')
export class DeviceController {
  constructor(private deviceService: DeviceService) {}

  @Get('all')
  async findDevices() {
    return await this.deviceService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.deviceService.findById(id);
  }
}
