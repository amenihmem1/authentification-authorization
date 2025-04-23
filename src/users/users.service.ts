import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users, UserDocument } from '../schema/schema.users';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name)
    private userModel: Model<UserDocument>,
  ) {}
async findByUsername(username: string) {
    const user = await this.userModel.findOne({ username }).exec();
    console.log('UsersService - Recherche username:', username, 'Résultat:', user);
    return user;
  }
  async create(username: string, password: string, role: string) {
    console.log('UsersService - Création utilisateur:', { username, password, role });
    const newUser = new this.userModel({ username, password, role }); // Pas de hachage ici
    const savedUser = await newUser.save();
    console.log('UsersService - Utilisateur sauvegardé:', savedUser);
    return savedUser;
  }
}
