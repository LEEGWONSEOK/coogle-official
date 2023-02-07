import {
  Controller,
  Body,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Query,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { Review } from '../entities';
import { PaginationDto, ReviewDto } from '../utils/dtos';

@Controller({ version: '1', path: 'reviews' })
export class ReviewsController {
  constructor(private reviewsService: ReviewsService) {}

  // 리뷰 생성
  @Post('/recipes/:recipeId')
  createReview(
    @Param('recipeId') recipeId: number,
    @Body() reviewDto: ReviewDto,
  ): Promise<Review> {
    return this.reviewsService.createReview(recipeId, reviewDto);
  }

  // 리뷰 전체 조회
  @Get('/recipes/:recipeId')
  getAllReviews(
    @Param('recipeId') recipeId: number,
    @Query() paginationDto: PaginationDto,
  ): Promise<Review[]> {
    return this.reviewsService.getAllReviews(recipeId, paginationDto);
  }

  // 리뷰 수정 페이지 조회
  @Get('/:reviewId/recipes/:recipeId')
  getReviewUpdate(@Param('reviewId') reviewId: number): Promise<Review> {
    return this.reviewsService.getReviewUpdate(reviewId);
  }

  // 리뷰 수정
  @Patch('/:reviewId/recipes/:recipeId')
  updateReview(
    @Param('reviewId') reviewId: number,
    @Body() updateReviewDto: ReviewDto,
  ): Promise<string> {
    return this.reviewsService.updateReview(reviewId, updateReviewDto);
  }

  // // 리뷰 삭제
  @Delete('/:reviewId/recipes/:recipeId')
  deleteReview(@Param('reviewId') reviewId: number): Promise<string> {
    return this.reviewsService.deleteReview(reviewId);
  }
}
