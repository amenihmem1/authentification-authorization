import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module'; // Importation du module Users
import { PassportModule } from '@nestjs/passport'; // Importation de PassportModule
import { JwtModule } from '@nestjs/jwt'; // Importation de JwtModule
import { JwtStrategy } from './jwt.strategy'; // Ajoute cette ligne

@Module({
  imports: [
    UsersModule, // Assurez-vous que ce module est exporté et disponible
    PassportModule, // Utilisation du PassportModule
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, JwtStrategy], // Utilisation de JwtStrategy ici
  controllers: [AuthController],
})
export class AuthModule {}
