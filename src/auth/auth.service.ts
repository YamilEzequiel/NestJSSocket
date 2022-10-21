import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { hash,compare} from 'bcrypt';
import { Model } from 'mongoose';
import { User, UserSchema } from 'src/user/schema/user.schema';
import { LoginAuthDto } from './dto/login-auth.dts';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserSchema>,
    private jwtService: JwtService
  ){}
  
  async register(userObject: RegisterAuthDto){
    const { password } = userObject;
    const plainTohash = await hash(password,10);
    userObject = { ...userObject, password:plainTohash };
    return this.userModel.create(userObject);
  }

  async login(userObject: LoginAuthDto){
    const {email, password} = userObject;
    const findUser = await this.userModel.findOne({email});
    if(!findUser) throw new HttpException('USER_NOT_FOUND',404);
    
    const checkPassword =  await compare(password, findUser.password);

    if(!checkPassword) throw new HttpException('USER_PASS_NOT_FOUND', 403);
  
    //Firma de Token
    const payload = {id: findUser._id,name: findUser.name};
    const token = this.jwtService.sign(payload);

    const data = {
      user: findUser,
      token
    };

    return data;
  }
}
