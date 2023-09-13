import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserName, User, UserDocument } from '../schemas/user.schema';
@Injectable()
export class UserService {
  relations = ['devices', 'routines'];
  constructor(@InjectModel(UserName) private userModel: Model<User>) {}

  async create(username: string, password: string) {
    const user = new this.userModel({
      username,
      password,
    });
    return user.save();
  }

  async findByUsername(username: string): Promise<UserDocument> {
    return this.userModel.findOne({ username }).exec();
  }

  async findById(id: string): Promise<UserDocument> {
    return this.userModel.findById(id).populate(this.relations).exec();
  }
}
