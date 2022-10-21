import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ItemsSchema = Items & Document;

@Schema()
export class Items {
  @Prop()
  name: string;

  @Prop()
  price: number;

  @Prop()
  descripcion: string;
}

export const ItemsSchema = SchemaFactory.createForClass(Items);
