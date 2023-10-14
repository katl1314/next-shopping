/**
 * 리터럴 타입
 * 카테고리
 * 신발, 옷, 책
 */
export type Category = 'shoes' | 'clothes' | 'book';

/**
 * 상품 상태
 * 새 상품, 중고 상품
 */
export type Condition = 'new' | 'used';

/**
 * 사용자 정보
 */
export interface User {
  id: number; // 사용자 아이디
  username: string; // 사용자 이름
  displayName: string; // 닉네임
  email: string; // 이메일
  profileImageUrl: string; // 프로필 이미지
  description: string; // 자기소개
  numberOfProducts: number;
}

/**
 * 상품 정보
 */

export interface Product {
  id: number;
  category: Category;
  title: string;
  description: string;
  imageUrl: string;
  blurDataUrl: string;
  price: number;
  condition: Condition;
  owner: number; // User.id
}

/**
 * API Context
 */
export interface ApiContext {
  apiRootUrl: string;
}
