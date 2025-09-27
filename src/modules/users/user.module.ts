import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersController } from './controllers/user.controller';
import { UsersService } from './services/user.service';
import { Tramite } from '../tramites/entities/tramites.entity';
import { TipoTramite } from '../tramites/entities/tipoTramite.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Tramite, TipoTramite])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
