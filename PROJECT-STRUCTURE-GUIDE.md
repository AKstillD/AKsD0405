# 프로젝트 구조 변경 가이드

## 현재 상태
- AKstillDreamin' 웹사이트: index.html (카톡 공유됨)
- BAEWUJA 제안서: baewuja-proposal-v2.html (새 프로젝트)

## 추천 방안

### 방법 1: 현재 상태 유지 (추천) ✅
- **장점**: 별도 작업 불필요, 이미 분리되어 있음
- **방법**: 아무것도 안 해도 됨
- **이유**: URL을 모르면 접근 불가

### 방법 2: 폴더 분리
```
루트/
├── akstilldreamin/         ← AKstillDreamin' 전용
│   ├── index.html
│   ├── styles.css
│   ├── script.js
│   ├── music/
│   └── images/
│
└── baewuja/                ← BAEWUJA 전용
    ├── index.html
    └── README.md
```

### 방법 3: 서브도메인 사용
- akstilldreamin.your-domain.com → AKstillDreamin'
- baewuja.your-domain.com → BAEWUJA

## 결론
**방법 1 (현재 상태 유지)**을 추천합니다.
카톡으로 공유된 링크는 index.html이고,
baewuja-proposal-v2.html은 별도 URL이므로 문제없습니다.
