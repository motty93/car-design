import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Session,
} from '@nestjs/common'
import { Serialize } from 'src/interceptors/serialize.interceptor'
import { AuthService } from './auth.service'
import { CreateUserDto } from './dtos/create-user.dto'
import { UpdateUserDto } from './dtos/update-user.dto'
import { UserDto } from './dtos/user.dto'
import { UsersService } from './users.service'

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('/signup')
  async createUser(@Body() dto: CreateUserDto) {
    // return await this.usersService.create(dto.email, dto.password)
    return this.authService.signup(dto.email, dto.password)
  }

  @Post('/signin')
  async signin(@Body() dto: CreateUserDto) {
    return this.authService.signin(dto.email, dto.password)
  }

  @Get('/colors/:color')
  async setColor(@Param('color') color: string, @Session() session: any) {
    session.color = color
  }

  @Get('/colors/:color')
  async getColor(@Session() session: any) {
    return session.color
  }

  // @UseInterceptors(new SerializeInterceptor(UserDto))
  @Get('/:id')
  async findUser(@Param('id') id: string) {
    console.log('handler is running')
    const user = await this.usersService.findOne(parseInt(id))
    if (!user) {
      throw new NotFoundException('user not found')
    }

    return user
  }

  @Get()
  async findAllUsers(@Query('email') email: string) {
    return await this.usersService.find(email)
  }

  @Delete('/:id')
  async removeUser(@Param('id') id: string) {
    return await this.usersService.remove(parseInt(id))
  }

  @Patch('/:id')
  async updateUser(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return await this.usersService.update(parseInt(id), dto)
  }
}
