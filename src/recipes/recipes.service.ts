import { Injectable, NotFoundException } from '@nestjs/common';
import { Recipe } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { PaginationDto, RecipeDto } from '../utils/dtos';

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recipe)
    private recipeRepository: Repository<Recipe>,
  ) {}

  // service로직 : 레시피 생성
  async createRecipe(createRecipeDto: RecipeDto): Promise<Recipe> {
    console.log(createRecipeDto);
    const result = this.recipeRepository.create({
      ...createRecipeDto,
      userId: 29,
    });
    await this.recipeRepository.save(result);
    return result;
  }

  // 레시피 전체 조회(카테고리=latest)
  async getAllRecipesByLatest(
    categoryId: number,
    paginationDto: PaginationDto,
  ): Promise<Recipe[]> {
    const { page, perpage } = paginationDto;
    const result = await this.recipeRepository.find({
      where: { categoryId },
      order: { createAt: 'DESC' },
      select: ['id', 'title', 'description', 'average_score', 'level'],
      take: perpage,
      skip: (page - 1) * perpage,
    });
    return result;
  }

  // 레시피 전체 조회(카테고리=popularity)
  async getAllRecipesByPopularity(
    categoryId: number,
    paginationDto: PaginationDto,
  ): Promise<Recipe[]> {
    const { page, perpage } = paginationDto;
    const result = await this.recipeRepository.find({
      where: { id: categoryId },
      order: { average_score: 'DESC' },
      select: ['id', 'title', 'description', 'average_score', 'level'],
      take: perpage,
      skip: (page - 1) * perpage,
    });
    return result;
  }

  // 레시피 전체 조회(카테고리=generated)
  async getAllRecipesByGenerated(
    categoryId: number,
    paginationDto: PaginationDto,
  ): Promise<Recipe[]> {
    const { page, perpage } = paginationDto;
    const result = await this.recipeRepository.find({
      where: { id: categoryId },
      order: { createAt: 'ASC' },
      select: ['id', 'title', 'description', 'average_score', 'level'],
      take: perpage,
      skip: (page - 1) * perpage,
    });
    return result;
  }

  // 레시피 검색 조회
  async getAllRecipesBySearch(
    q: string,
    paginationDto: PaginationDto,
  ): Promise<Recipe[]> {
    const { page, perpage } = paginationDto;
    const result = await this.recipeRepository.find({
      select: ['id', 'title', 'description', 'average_score', 'level'],
      take: perpage,
      skip: (page - 1) * perpage,
      where: [{ title: Like(`%${q}%`) }],
    });
    return result;
  }

  // 레시피 상세 조회
  getRecipe(recipeId: number) {
    return this.recipeRepository.findOne({
      select: [
        'id',
        'title',
        'serving',
        'description',
        'average_score',
        'level',
        'ingredients',
        'condiments',
      ],
      where: { id: recipeId },
    });
  }

  // 레시피 step 조회
  async getRecipeStep(recipeId: number): Promise<Recipe> {
    return this.recipeRepository.findOne({
      select: ['contents'],
      where: { id: recipeId },
    });
  }

  // 레시피 수정 페이지 조회
  async getRecipeUpdate(recipeId: number): Promise<Recipe> {
    return this.recipeRepository.findOne({
      where: { id: recipeId },
    });
  }

  // 레시피 수정
  async updateRecipe(
    recipeId: number,
    updateRecipeDto: RecipeDto,
  ): Promise<string> {
    const result = await this.recipeRepository.update(recipeId, {
      ...updateRecipeDto,
    });
    if (result.affected !== 1) {
      throw new NotFoundException(`Can't find Recipe with id '${recipeId}'`);
    }
    return `Board '${recipeId}' has been updated`;
  }

  // 레시피 삭제
  async deleteRecipe(recipeId: number): Promise<string> {
    const result = await this.recipeRepository.delete({ id: recipeId });
    if (result.affected !== 1) {
      throw new NotFoundException(`Can't find Recipe with id '${recipeId}'`);
    }
    return `Board '${recipeId}' has been deleted`;
  }
}
