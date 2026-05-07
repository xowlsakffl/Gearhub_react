# GearHub React

GearHub는 전자제품 전용 이커머스 쇼핑몰 프론트엔드입니다. 일반 사용자는 상품 탐색, 장바구니, 주문, 배송지 관리를 사용할 수 있고, 관리자는 별도 운영 콘솔에서 상품, 카테고리, 주문 상태를 관리할 수 있습니다.

## 주요 기능

- 전자제품 쇼핑몰 메인 화면 및 상품 리스트
- 상품 상세 페이지, 관련 상품, 장바구니 담기
- 회원가입, 로그인, 사용자 주문 내역
- 배송지 등록 및 카카오 주소 검색 연동
- 데모 결제 및 주문 생성 플로우
- 관리자 전용 대시보드
- 관리자 상품 등록, 수정, 삭제
- 관리자 카테고리 등록, 수정, 삭제
- 관리자 주문 조회 및 주문 상태 변경
- 사용자 화면과 관리자 화면 라우트 모듈 분리

## 관리자 계정

- 일반 사용자: `demo / password123!`
- 관리자: `admin / admin1234!`

## 기술 스택

- React 19
- Vite 6
- React Router v7
- Redux Toolkit
- Axios
- Tailwind CSS
- MUI
- React Hook Form
- Swiper
- Stripe
- React Daum Postcode

## 실행 방법

```bash
npm install
npm run dev
```

백엔드 기본 주소는 `.env`의 `VITE_BACK_END_URL`에서 설정합니다.

## 빌드

```bash
npm run build
```
