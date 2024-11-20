import { Module } from '@nestjs/common';

import { AppModule } from 'src/server/app/app.module';
import { ViewModule } from 'src/server/view/view.module';
import { SharedModule } from './app/shared/shared.module';
import { CommandsService } from './app/commands/commands.service';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    SharedModule,
    AppModule,
    ViewModule
  ],
  providers: [CommandsService],
})
export class ServerModule {
  constructor(private dataSource: DataSource) {}
}
