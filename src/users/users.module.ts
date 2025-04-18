import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { Users, UserSchema } from '../schema/schema.users';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Users.name, schema: UserSchema }]),
  ],
  providers: [UsersService],
  exports: [UsersService], // important si utilisé dans d'autres modules
})
export class UsersModule {}
