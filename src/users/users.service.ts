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
  async findByUsername(username: string): Promise<Users | undefined> {
    const user = await this.userModel.findOne({ username });
    return user || undefined;
  }
  async create(
    username: string,
    password: string,
    role: string = 'user',
  ): Promise<Users> {
    const hashed = await bcrypt.hash(password, 10);
    const user = new this.userModel({ username, password: hashed, role });
    return user.save();
  }
}
