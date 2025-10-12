# ==================================
# STAGE 1: Build the React App (Workshop)
# ==================================
# Node.js 18 버전을 빌드 환경으로 사용합니다.
FROM node:18-alpine AS builder

# 컨테이너 내의 작업 디렉토리를 /app 으로 설정합니다.
WORKDIR /app

# ✅ [수정됨] 실제 프로젝트 폴더인 'scas-frontend/'에서 package.json 파일을 복사합니다.
# Docker는 이 단계를 캐싱하여 빌드 속도를 높여줍니다.
COPY scas-frontend/package*.json ./

# 의존성 패키지를 설치합니다.
RUN npm install

# ✅ [수정됨] 'scas-frontend/' 폴더 안의 모든 소스 코드를 복사합니다.
COPY scas-frontend/. ./

# 프로덕션용으로 앱을 빌드합니다. ('/app/build' 폴더가 생성됩니다.)
RUN npm run build

# ==================================
# STAGE 2: Serve the App with Nginx (Showroom)
# ==================================
# 최종 이미지는 가벼운 Nginx 웹서버를 사용합니다.
FROM nginx:1.25-alpine

# 빌드 단계(builder)에서 생성된 결과물(/app/build)을
# Nginx의 기본 웹사이트 폴더(/usr/share/nginx/html)로 복사합니다.
COPY --from=builder /app/build /usr/share/nginx/html

# 컨테이너의 80번 포트를 외부에 노출시킵니다.
EXPOSE 80

# 컨테이너가 시작될 때 Nginx를 실행합니다.
CMD ["nginx", "-g", "daemon off;"]
