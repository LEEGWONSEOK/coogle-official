import { Injectable, NotFoundException } from '@nestjs/common';
import { Recipe } from '../../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { PaginationDto, RecipeDto } from '../../common/dtos';

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recipe)
    private repo: Repository<Recipe>,
  ) {}

  // service로직 : 레시피 생성
  async createRecipe(body: RecipeDto): Promise<Recipe> {
    const result = this.repo.create({
      ...body,
      userId: 29,
    });
    await this.repo.save(result);
    return result;
  }

  // 레시피 전체 조회(카테고리=latest)
  async getRecipesByLatest(
    id: number,
    paginationDto: PaginationDto,
  ): Promise<Recipe[]> {
    const { page, perpage } = paginationDto;
    const result = await this.repo.find({
      where: { categoryId: id },
      order: { createAt: 'DESC' },
      select: ['id', 'title', 'description', 'average_score', 'level'],
      take: perpage,
      skip: (page - 1) * perpage,
    });
    if (!result) {
      throw new NotFoundException(`Can't find Recipes`);
    }
    return result;
  }

  // 레시피 전체 조회(카테고리=popularity(인기 순))
  async getRecipesByPopularity(
    id: number,
    paginationDto: PaginationDto,
  ): Promise<Recipe[]> {
    const { page, perpage } = paginationDto;
    const result = await this.repo.find({
      where: { categoryId: id },
      order: { average_score: 'DESC' },
      select: ['id', 'title', 'description', 'average_score', 'level'],
      take: perpage,
      skip: (page - 1) * perpage,
    });
    if (!result) {
      throw new NotFoundException(`Can't find Recipes`);
    }
    return result;
  }

  // 레시피 전체 조회(카테고리=generated(생성일 기준))
  async getRecipesByGenerated(
    id: number,
    paginationDto: PaginationDto,
  ): Promise<Recipe[]> {
    const { page, perpage } = paginationDto;
    const result = await this.repo.find({
      where: { categoryId: id },
      order: { createAt: 'ASC' },
      select: ['id', 'title', 'description', 'average_score', 'level'],
      take: perpage,
      skip: (page - 1) * perpage,
    });
    if (!result) {
      throw new NotFoundException(`Can't find Recipes`);
    }
    return result;
  }

  // 레시피 검색 조회
  async getRecipesBySearch(
    q: string,
    paginationDto: PaginationDto,
  ): Promise<Recipe[]> {
    const { page, perpage } = paginationDto;
    const result = await this.repo.find({
      select: ['id', 'title', 'description', 'average_score', 'level'],
      take: perpage,
      skip: (page - 1) * perpage,
      where: [{ title: Like(`%${q}%`) }],
    });
    if (!result) {
      throw new NotFoundException(`Can't find Recipe with keyword '${q}'`);
    }
    return result;
  }

  // 레시피 상세 조회
  async getRecipe(id: number) {
    const result = await this.repo.findOne({
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
      where: { id },
    });
    if (!result) {
      throw new NotFoundException(`Can't find Recipe with id '${id}'`);
    }
    return result;
  }

  // 레시피 step 조회
  async getRecipeStep(id: number): Promise<Recipe> {
    const result = await this.repo.findOne({
      select: ['contents'],
      where: { id },
    });
    if (!result) {
      throw new NotFoundException(`Can't find Recipe Step with id '${id}'`);
    }
    return result;
  }

  // 레시피 수정 페이지 조회
  async getRecipeUpdate(id: number): Promise<Recipe> {
    const result = await this.repo.findOne({ where: { id } });
    if (!result) {
      throw new NotFoundException(`Can't find Recipe with id'${id}'`);
    }
    return result;
  }

  // 레시피 수정
  async updateRecipe(id: number, body: RecipeDto): Promise<string> {
    const result = await this.repo.update(id, {
      ...body,
    });
    if (result.affected !== 1) {
      throw new NotFoundException(`Can't find Recipe with id '${id}'`);
    }
    return `Board '${id}' has been updated`;
  }

  // 레시피 삭제
  async deleteRecipe(id: number): Promise<string> {
    const result = await this.repo.delete({ id });
    if (result.affected !== 1) {
      throw new NotFoundException(`Can't find Recipe with id '${id}'`);
    }
    return `Board '${id}' has been deleted`;
  }
}
