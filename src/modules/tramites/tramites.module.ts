import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoTramiteController } from './controller/tipo-tramite.controller';
import { TramitesController } from './controller/tramites.controller';
import { TipoTramiteService } from './services/tipo-tramite.service';
import { TramitesService } from './services/tramites.service';
import { TurnoController } from './controller/tipo-turno.controller';
import { TipoTramite } from './entities/tipoTramite.entity';
import { Tramite } from './entities/tramites.entity';
import { Turno } from './entities/turnos.entity';
import { TurnoService } from './services/tipo-turno.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tramite, Turno, TipoTramite])],
  controllers: [TramitesController, TurnoController, TipoTramiteController],
  providers: [TramitesService, TurnoService, TipoTramiteService],
  exports: [TramitesService],
})
export class TramitesModule {}
