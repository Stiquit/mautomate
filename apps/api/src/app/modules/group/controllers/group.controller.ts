import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { GroupService } from '../services/group.service';
import { AuthPayload } from '../../user/decorators/auth-payload.decorator';
import { CreateGroupDto, JwtPayload } from '@mautomate/api-interfaces';

@Controller('group')
export class GroupController {
  constructor(private groupService: GroupService) {}

  @Post()
  async addUserGroup(
    @AuthPayload() payload: JwtPayload,
    @Body() body: CreateGroupDto
  ) {
    const { id } = payload;
    return await this.groupService.addGroupToUser(id, body);
  }

  @Get('user')
  async findUserGroups(@AuthPayload() payload: JwtPayload) {
    const { id } = payload;
    return await this.groupService.findUserGroups(id);
  }

  @Put(':id')
  async updateDevice(
    @AuthPayload() payload: JwtPayload,
    @Body() body: CreateGroupDto,
    @Param('id') id: string
  ) {
    const { id: userId } = payload;
    return await this.groupService.updateGroup(id, userId, body);
  }

  @Delete(':id')
  async deleteById(
    @Param('id') id: string,
    @AuthPayload() payload: JwtPayload
  ) {
    const { id: userId } = payload;
    return this.groupService.deleteById(id, userId);
  }

  /**
   *
   * TODO: Remove this endpoint
   */
  @Get('all')
  async findAll() {
    return this.groupService.findAll();
  }

  /**
   *
   * TODO: Remove this endpoint
   */
  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.groupService.findById(id);
  }
}
