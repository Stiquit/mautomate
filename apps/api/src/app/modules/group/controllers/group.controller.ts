import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GroupService } from '../services/group.service';
import { AuthPayload } from '../../user/decorators/auth-payload.decorator';
import { CreateGroupDto, JwtPayload } from '@mautomate/api-interfaces';

@Controller('group')
export class GroupController {
  constructor(private groupService: GroupService) {}

  @Get('all')
  async findAll() {
    return this.groupService.findAll();
  }

  @Get('user')
  async findUserGroups(@AuthPayload() payload: JwtPayload) {
    const { id } = payload;
    return await this.groupService.findUserGroups(id);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.groupService.findById(id);
  }

  @Post()
  async addUserGroup(
    @AuthPayload() payload: JwtPayload,
    @Body() body: CreateGroupDto
  ) {
    const { id } = payload;
    return await this.groupService.addGroupToUser(id, body);
  }
}
