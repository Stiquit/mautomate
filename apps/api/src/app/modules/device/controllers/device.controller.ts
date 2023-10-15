import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
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

  /**
   *
   * TODO: Remove this endpoint
   */
  @Get('all')
  async findDevices() {
    return await this.deviceService.findAll();
  }

  /**
   *
   * TODO: Remove this endpoint
   */
  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.deviceService.findById(id);
  }

  @Delete(':id')
  async deleteById(
    @Param('id') id: string,
    @AuthPayload() payload: JwtPayload
  ) {
    const { id: userId } = payload;
    return this.deviceService.deleteById(id, userId);
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
