import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Query,
  BadRequestException,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { Recipe, User } from '../../entities';
import { PaginationDto, RecipeDto } from '../../common/dtos';
import { ApiTags, ApiOperation, ApiCreatedResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../users/decorator/get-user.decorator';

@Controller({ version: '1', path: 'recipes' })
@ApiTags('레시피 API')
export class RecipesController {
  constructor(private service: RecipesService) {}

  // 레시피 생성
  @Post('/')
  @ApiOperation({ summary: '레시피 생성 API', description: '레시피 생성' })
  @ApiCreatedResponse({ description: '레시피 생성', type: Recipe })
  @UseGuards(AuthGuard())
  createRecipe(
    @Body() body: RecipeDto,
    @GetUser() user: User,
  ): Promise<Recipe> {
    return this.service.createRecipe(body, user);
  }

  // 레시피 전체 조회(필터 기준)
  @Get('/categories/:id')
  getRecipes(
    @Param('id') id: string,
    @Query('filter') filter: string,
    @Query() paginationDto: PaginationDto,
  ): Promise<Recipe[]> {
    if (filter === 'latest') {
      return this.service.getRecipesByLatest(parseInt(id), paginationDto);
    } else if (filter === 'popularity') {
      return this.service.getRecipesByPopularity(parseInt(id), paginationDto);
    } else if (filter === 'generated') {
      return this.service.getRecipesByGenerated(parseInt(id), paginationDto);
    } else {
      throw new BadRequestException('Invalid filter');
    }
  }

  // 레시피 검색 조회
  @Get('/search')
  getRecipesBySearch(
    @Query('q') q: string,
    @Query() paginationDto: PaginationDto,
  ): Promise<Recipe[]> {
    return this.service.getRecipesBySearch(q, paginationDto);
  }

  // 레시피 상세 조회
  @Get('/:id')
  getRecipe(@Param('id') id: string): Promise<Recipe> {
    return this.service.getRecipe(parseInt(id));
  }

  // 레시피 step 조회
  @Get('/:id/step')
  getRecipeStep(@Param('id') id: string): Promise<Recipe> {
    return this.service.getRecipeStep(parseInt(id));
  }

  // 레시피 수정 페이지 조회
  @Get('/:id/update')
  getRecipeUpdate(@Param('id') id: string): Promise<Recipe> {
    return this.service.getRecipeUpdate(parseInt(id));
  }

  // 레시피 수정
  @Patch('/:id')
  updateRecipe(
    @Param('id') id: string,
    @Body() body: RecipeDto,
  ): Promise<string> {
    return this.service.updateRecipe(parseInt(id), body);
  }

  // 레시피 삭제
  @Delete('/:id')
  deleteRecipe(@Param('id') id: string): Promise<string> {
    return this.service.deleteRecipe(parseInt(id));
  }
}
