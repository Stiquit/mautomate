import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { DeviceService } from '../services/device.service';
import {
  JwtPayload,
  AddDevicesRequest,
  CreateDeviceDTO,
} from '@mautomate/api-interfaces';
import { AuthPayload } from '../../user/decorators/auth-payload.decorator';

@Controller('device')
export class DeviceController {
  constructor(private deviceService: DeviceService) {}

  @Post()
  async addUserDevice(
    @AuthPayload() payload: JwtPayload,
    @Body() body: AddDevicesRequest
  ) {
    const { id } = payload;
    const { newDevices } = body;
    return await this.deviceService.addDevicesToUser(id, newDevices);
  }

  @Get('user')
  async findUserDevices(@AuthPayload() payload: JwtPayload) {
    const { id } = payload;
    return await this.deviceService.findUserDevices(id);
  }

  @Put(':id')
  async updateDevice(
    @AuthPayload() payload: JwtPayload,
    @Body() body: CreateDeviceDTO,
    @Param('id') id: string
  ) {
    const { id: userId } = payload;
    return await this.deviceService.updateDevice(id, userId, body);
  }

  @Delete(':id')
  async deleteById(
    @Param('id') id: string,
    @AuthPayload() payload: JwtPayload
  ) {
    const { id: userId } = payload;
    return this.deviceService.deleteById(id, userId);
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
}
