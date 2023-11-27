import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { RoutineService } from '../services/routine.service';
import { CreateRoutineDto, JwtPayload } from '@mautomate/api-interfaces';
import { AuthPayload } from '../../user/decorators/auth-payload.decorator';

@Controller('routine')
export class RoutineController {
  constructor(private routineService: RoutineService) {}

  @Post()
  async addRoutineToUser(
    @AuthPayload() payload: JwtPayload,
    @Body() body: CreateRoutineDto
  ) {
    const { id: userId } = payload;
    return await this.routineService.addRoutineToUser(userId, body);
  }

  @Get('user')
  async findUserRoutines(@AuthPayload() payload: JwtPayload) {
    const { id: userId } = payload;
    return await this.routineService.findUserRoutines(userId);
  }

  @Put(':id')
  async updateRoutine(
    @AuthPayload() payload: JwtPayload,
    @Body() body: CreateRoutineDto,
    @Param('id') id: string
  ) {
    const { id: userId } = payload;
    return await this.routineService.updateRoutine(id, userId, body);
  }

  @Delete(':id')
  async deleteById(
    @Param('id') id: string,
    @AuthPayload() payload: JwtPayload
  ) {
    const { id: userId } = payload;
    return this.routineService.deleteById(id, userId);
  }
}
