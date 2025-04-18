import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CategoriesDocument = HydratedDocument<Categories>;

@Schema()
export class Categories {
  static readonly name = 'Categories';

  @Prop({ required: true })
  name: string;
}

export const CategoriesSchema = SchemaFactory.createForClass(Categories);
