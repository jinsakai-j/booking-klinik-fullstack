import { PartialType } from '@nestjs/mapped-types';
import { CreateJanjiTemuDto } from './create-janji-temu.dto.js';

export class UpdateJanjiTemuDto extends PartialType(CreateJanjiTemuDto) {}
