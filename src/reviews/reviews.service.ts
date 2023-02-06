import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from 'src/entities';
import { Repository } from 'typeorm';
import { PaginationDto, ReviewDto } from 'src/utils/dtos';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
  ) {}

  // 리뷰 생성
  async createReview(recipeId: number, reviewDto: ReviewDto): Promise<Review> {
    const result = this.reviewRepository.create({
      ...reviewDto,
    });
    await this.reviewRepository.save(result);
    return result;
  }

  // 리뷰 전체 조회(레시피 기준)
  async getAllReviews(
    recipeId: number,
    paginationDto: PaginationDto,
  ): Promise<Review[]> {
    const { page, perpage } = paginationDto;
    const result = this.reviewRepository.find({
      take: perpage,
      skip: (page - 1) * perpage,
      order: { createAt: 'DESC' },
      select: [],
    });
    return result;
  }

  // 리뷰 수정 페이지 조회
  async getReviewUpdate(reviewId: number): Promise<Review> {
    return this.reviewRepository.findOne({ where: { id: reviewId } });
  }

  // 리뷰 수정
  async updateReview(reviewId: number): Promise<void> {
    return;
  }

  // 리뷰 삭제
  async deleteReview(reviewId: number): Promise<void> {
    return;
  }
}
