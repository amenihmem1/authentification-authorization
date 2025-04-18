// src/categories/categories.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Categories, CategoriesDocument } from '../schema/schema.Categories';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('Categories')
    private readonly categoryModel: Model<CategoriesDocument>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Categories> {
    const created = new this.categoryModel(createCategoryDto);
    return created.save();
  }

  async findAll(): Promise<Categories[]> {
    return this.categoryModel.find().exec();
  }

  async findOne(id: string): Promise<Categories> {
    const category = await this.categoryModel.findById(id).exec();
    if (!category) throw new NotFoundException('Category not found');
    return category;
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Categories> {
    const updated = await this.categoryModel.findByIdAndUpdate(
      id,
      updateCategoryDto,
      { new: true },
    );
    if (!updated) throw new NotFoundException('Category not found');
    return updated;
  }

  async remove(id: string): Promise<Categories> {
    const deleted = await this.categoryModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Category not found');
    return deleted;
  }
}
