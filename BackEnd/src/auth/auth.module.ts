import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { DatabaseModule } from 'src/database/database.module';
import { AuthController } from './auth.controller';
import { authProviders } from './auth.providers';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [
      DatabaseModule,
      PassportModule.register({defaultStrategy: 'jwt'}),
      JwtModule.register({
        secret: 'topSecret51',
        signOptions: {
          expiresIn: 3600,
        }
      })
  ],
    providers: [...authProviders, AuthService, JwtStrategy],
    controllers: [AuthController],
    // every other module that is going to import this module will ahve access to the jwt strategy and authorizatioon.
    exports: [JwtStrategy, PassportModule],
  })
  export class AuthModule {}
