import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { UserDocument } from '../schema/schema.users';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // Valide le mot de passe de l'utilisateur
  async validateUser(username: string, pass: string): Promise<any> {
    console.log('Mot de passe entré:', pass);
    const user = await this.usersService.findByUsername(username);
    console.log('Utilisateur trouvé:', user);
    if (user && (await bcrypt.compare(pass, user.password))) {
      console.log('Mot de passe correspond: true');
      const { password, ...result } = (user as UserDocument).toObject();
      return result;
    }
    console.log('Mot de passe correspond: false');
    return null;
  }

  // Crée un token JWT pour l'utilisateur connecté
  login(user: UserDocument) {
    const payload = { username: user.username, sub: user._id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // Inscription d’un nouvel utilisateur
  async register(username: string, password: string, role: string = 'user') {
    console.log('Inscription - Username:', username, 'Role:', role);
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Mot de passe haché:', hashedPassword);
    const newUser = await this.usersService.create(
      username,
      hashedPassword,
      role,
    );
    console.log('Utilisateur créé:', newUser);
    return newUser;
  }
}
