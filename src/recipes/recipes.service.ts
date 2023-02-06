import { Injectable } from '@nestjs/common';
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
    // const {
    //   title,
    //   serving,
    //   description,
    //   level,
    //   contents,
    //   ingredients,
    //   condiments,
    // } = createRecipeDto;

    console.log(createRecipeDto);
    // const result = this.recipeRepository.create({
    //   title,
    //   serving,
    //   description,
    //   average_score: 0,
    //   level,
    //   contents,
    //   ingredients,
    //   condiments,
    // });

    const result = this.recipeRepository.create({
      ...createRecipeDto,
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
    const result = this.recipeRepository.find({
      take: perpage,
      skip: (page - 1) * perpage,
      order: { createAt: 'DESC' },
      select: ['id', 'title', 'description', 'average_score', 'level'],
      //where: { category: { id: categoryId } },
    });
    return result;
  }

  // 레시피 전체 조회(카테고리=popularity)
  async getAllRecipesByPopularity(
    categoryId: number,
    paginationDto: PaginationDto,
  ): Promise<Recipe[]> {
    const { page, perpage } = paginationDto;
    const result = this.recipeRepository.find({
      select: ['id', 'title', 'description', 'average_score', 'level'],
      //where: { id: categoryId },
      take: perpage,
      skip: (page - 1) * perpage,
      order: { average_score: 'DESC' },
    });
    return result;
  }

  // 레시피 전체 조회(카테고리=generated)
  async getAllRecipesByGenerated(
    categoryId: number,
    paginationDto: PaginationDto,
  ): Promise<Recipe[]> {
    const { page, perpage } = paginationDto;
    const result = this.recipeRepository.find({
      select: ['id', 'title', 'description', 'average_score', 'level'],
      //where: { id: categoryId },
      take: perpage,
      skip: (page - 1) * perpage,
      order: { createAt: 'ASC' },
    });
    return result;
  }

  // 레시피 검색 조회
  async getAllRecipesBySearch(
    q: string,
    paginationDto: PaginationDto,
  ): Promise<Recipe[]> {
    const { page, perpage } = paginationDto;
    const result = this.recipeRepository.find({
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
  async updateRecipe(recipeId: number) {
    // return this.recipeRepository.();
  }

  // 레시피 삭제
  async deleteRecipe(recipeId: number) {
    // return this.recipeRepository.deleteRecipeById();
  }
}
