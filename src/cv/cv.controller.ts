import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Req,
  SerializeOptions,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { CvService } from './cv.service';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, fileFilter } from '../generics/file.utils';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuardGuard } from '../auth/guards/admin-guard.guard';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { User } from '../user/entities/user.entity';
import { Roles } from '../auth/decorator/roles.decorator';
import { RoleGuard } from '../auth/guards/role.guard';
import { Cv } from './entities/cv.entity';
import { Serialize } from "../decorator/serialize.decorator";

@Controller('cv')
// @UseInterceptors(ClassSerializerInterceptor)
@Roles('admin')
export class CvController {
  constructor(private readonly cvService: CvService) {}

  @Post()
  @UseGuards(AdminGuardGuard)
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public/uploads',
        filename: editFileName,
      }),
      fileFilter,
    }),
  )
  create(
    @Body() createCvDto: CreateCvDto,
    @UploadedFile() file: Express.Multer.File,
    @GetUser() user: User,
  ) {
    if (file && file.filename) {
      createCvDto.path = file.filename;
    }
    createCvDto.user = user;
    return this.cvService.create(createCvDto);
  }

  @Get()
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard('jwt'))
  @Roles('user')
  @Serialize(Cv, ['user'])
  // @SerializeOptions({
  //   groups: ['user', 'admin'],
  //   excludeExtraneousValues: true,
  // })
  findAll(): Promise<Cv[]> {
    return this.cvService.findAll();
  }

  @Get(':id')
  @Roles('user')
  findOne(@Param('id') id: string) {
    return this.cvService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCvDto: UpdateCvDto) {
    return this.cvService.update(+id, updateCvDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cvService.remove(+id);
  }
}
