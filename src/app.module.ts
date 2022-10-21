import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemsModule } from './items/items.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { Gatway } from './SocketIO/gateway';
import { CandidatosModule } from './candidatos/candidatos.module';

@Module({
  imports: [ItemsModule, MongooseModule.forRoot('mongodb://localhost/nest'), UserModule, AuthModule, CandidatosModule],
  controllers: [AppController],
  providers: [AppService, Gatway],
})
export class AppModule {}
