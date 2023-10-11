import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DeviceService } from '../services/device.service';
import { JwtPayload, AddDevicesRequest } from '@mautomate/api-interfaces';
import { AuthPayload } from '../../user/decorators/auth-payload.decorator';

@Controller('device')
export class DeviceController {
  constructor(private deviceService: DeviceService) {}

  @Get('user')
  async findUserDevices(@AuthPayload() payload: JwtPayload) {
    const { id } = payload;
    return await this.deviceService.findUserDevices(id);
  }

  @Get('all')
  async findDevices() {
    return await this.deviceService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.deviceService.findById(id);
  }

  @Post()
  async addUserDevice(
    @AuthPayload() payload: JwtPayload,
    @Body() body: AddDevicesRequest
  ) {
    const { id } = payload;
    const { newDevices } = body;
    return await this.deviceService.addDevices(id, newDevices);
  }
}
