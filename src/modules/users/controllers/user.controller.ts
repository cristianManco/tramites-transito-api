import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { UsersService } from '../services/user.service';
import { CreateUserDto, UpdateUserDto } from '../dtos/create-user.dto';
import { UserResponseDto } from '../dtos/user-response.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  @ApiResponse({ status: 201, type: UserResponseDto })
  async create(@Body() dto: CreateUserDto) {
    return await this.usersService.create(dto);
  }

  @Get('all')
  @ApiResponse({ status: 200, type: [UserResponseDto] })
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get('details/:id')
  @ApiResponse({ status: 200, type: UserResponseDto })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.findOne(id);
  }

  @Put('update/:id')
  @ApiResponse({ status: 200, type: UserResponseDto })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUserDto,
  ) {
    return await this.usersService.update(id, dto);
  }

  @Delete('delete/:id')
  @ApiResponse({ status: 204, description: 'Usuario eliminado' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.remove(id);
  }
}
