import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RecipeCategory } from 'src/entities';
import { RecipeCategoryDto } from 'src/utils/dtos/recipe-category.dto';
import { Repository } from 'typeorm';

@Injectable()
export class RecipeCategoriesService {
  constructor(
    @InjectRepository(RecipeCategory)
    private recipeCategoryRepository: Repository<RecipeCategory>,
  ) {}

  // 레시피 카테고리 생성
  async createRecipeCategory(
    createRecipeCategoryDto: RecipeCategoryDto,
  ): Promise<RecipeCategory> {
    const result = this.recipeCategoryRepository.create({
      ...createRecipeCategoryDto,
    });
    await this.recipeCategoryRepository.save(result);
    return result;
  }

  // 레시피 카테고리 전체 조회
  async getAllRecipeCategories(): Promise<RecipeCategory[]> {
    const result = await this.recipeCategoryRepository.find({
      select: ['id', 'title'],
    });
    return result;
  }

  // 레시피 카테고리 수정
  async updateRecipeCategory(
    categoryId: number,
    updateRecipeCategoryDto: RecipeCategoryDto,
  ): Promise<string> {
    const id = categoryId;
    const result = await this.recipeCategoryRepository.update(id, {
      ...updateRecipeCategoryDto,
    });
    if (result.affected !== 1) {
      throw new NotFoundException(`Can't find Recipe with id '${id}'`);
    }
    return `Category '${id}' has been updated`;
  }

  // 레시피 카테고리 삭제
  async deleteRecipeCategory(categoryId: number): Promise<string> {
    const result = await this.recipeCategoryRepository.delete({
      id: categoryId,
    });
    if (result.affected !== 1) {
      throw new NotFoundException(`Can't find Recipe with id '${categoryId}'`);
    }
    return `Category '${categoryId}' has been deleted`;
  }
}
