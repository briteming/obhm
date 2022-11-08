---
title: 'GatsbyJS 블로그 길라잡이'
slug: '2022-10-22-gatsbyjs-walkthrough'
date: '2022-10-22'
template: post
draft: false
category: 'frontend'
socialImage: '/images/gatsbyjs-walkthrough/img-saengko-question.png'
tags: ['react', 'gatsbyjs']
---

### 서론

최근 카카오의 ['SK C&C 판교 데이터센터 화재로 인한 인터넷 서비스 장애 사건'](https://www.kakaocorp.com/page/detail/9814) 당시 알고리즘 정리를 위해 운영하던 티스토리의 접속이 불가능했습니다. 장애는 약 5일 지속되었는데, 복구 우선순위가 아니었는지 이틀간은 코드 하이라이팅(Code Syntax Highlighting)과 LaTeX가 적용되지 않은 모바일 페이지가 보이기도 했습니다.

<img src="/images/2022-10-22-gatsbyjs-walkthrough/img-saengko-question.png" alt="생활코딩에 올라온 블로그 추천 포스트" style="max-width: 560px;"/>

`생활코딩`을 비롯한 프로그래밍 관련 그룹에서는 다른 블로그로의 이전에 관한 토의가 많아졌으며, 저 또한 안정성 있는 블로그 이전을 고려해왔기에 `GatsbyJS`를 이용한 [알고리즘 정리 블로그](https://solved.haklee.me)를 만들었습니다.

이 글은 `GatsbyJS`를 이용한 프로젝트의 생성, `TypeScript`와 `ESLint` 적용을 다룹니다.

### 개발에 앞서,

`React` 개발과 마찬가지로 4GB 이상의 메모리가 필요합니다. 또한, `NodeJS`, `NPM(Node Package Manager)`이 설치되어 있어야 합니다.  
로컬에서 작업하신다면 CPU 성능 혹은 메모리 크기가 부족하지 않겠지만, `Goorm IDE`의 경우 프리미엄 플랜 이상, `AWS Cloud9`의 경우 t3.medium 플랜 이상을 사용해야 작업 도중 서버가 멈추는 일이 발생하지 않습니다.

### 1. Gatsby CLI 설치 및 프로젝트 생성

```bash
$ npm install -g gatsby-cli
$ gatsby new [PROJECT_TITLE]
```

`Gatsby CLI`를 설치하고, `gatsby new` 명령어를 통해 프로젝트를 생성했다면, 프로젝트에 `Yarn` 패키지 매니저를 설정합니다.

```bash
$ yarn install
```

만약 `Yarn`이 설치되어 있지 않다면 아래의 명령어를 통해 설치합시다.

```bash
$ npm install -g yarn
```

### 2. TypeScript 설치

```bash
$ yarn add -D typescript
$ yarn add gatsby-plugin-typescript
```

`GatsbyJS`에서는 설치한 패키지를 적용하기 위해 프로젝트 최상단에 있는 `gatsby-config.js`에 설치한 패키지의 이름을 명시하여야 합니다.

```javascript
module.exports = {
  siteMetadata: metaConfig,
  plugins: [
    `gatsby-plugin-typescript`, // 추가
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
  ],
};
```

사용하지 않는 패키지(`gatsby-plugin-manifest` 등)는 `yarn remove` 명령어를 통해 제거하였습니다.

### 3. TypeScript 적용

`TypeScript`를 활성화하기 위해 프로젝트의 최상단에 `tsconfig.json` 파일을 생성해야 합니다. 아래의 명령어를 통해 생성할 수 있습니다.

```bash
$ yarn tsc --init
```

생성한 파일을 열고 아래와 같이 설정합니다. 해당 설정을 꼭 따를 필요는 없습니다.

```json
{
  "compilerOptions": {
    "target": "es5",
    "jsx": "preserve",
    "module": "commonjs",
    "moduleResolution": "node",
    "baseUrl": "",
    "paths": {
      "@/config/*": ["./*"],
      "@/components/*": ["./src/components/*"],
      "@/utils/*": ["./src/utils/*"],
      "@/hooks/*": ["./src/hooks/*"],
      "@/styles/*": ["./src/styles/*"]
    },
    "resolveJsonModule": true,
    "allowJs": true,
    "noEmit": true,
    "isolatedModules": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "skipLibCheck": true
  },
  "include": ["./src/**/*"],
  "exclude": ["node_modules"]
}
```

여기서 `paths` 부분은 `TypeScript`에서 모듈 파일의 절대주소 기능을 제공합니다. `baseUrl`을 기준으로 작성을 해주면 되는데, `@/config/*` 주소를 사용하기 위해 `baseUrl`을 비웠습니다.

```typescript
import Layout from '../../components/layout'; // unuse
import Layout from '@/components/layout'; // use
```

해당 기능은 `#3-1`을 모두 설정해야 사용이 가능합니다. 따라서, `paths`를 사용하지 않는다면 `#4`로 넘어가세요.

#### 3-1. gatsby-node.js에 Webpack Config 추가

`paths`에 설정한 경로를 사용하기 위해서는 Webpack Config를 추가하여야 합니다. 프로젝트 최상단의 `gatsby-node.js` 파일을 열고 아래와 같이 작성합니다.

```javascript
const path = require('path');

exports.onCreateWebpackConfig = ({ getConfig, actions }) => {
  const output = getConfig().output || {};

  actions.setWebpackConfig({
    output,
    resolve: {
      alias: {
        '@/config': path.resolve(__dirname, '.'),
        '@/components': path.resolve(__dirname, 'src/components'),
        '@/utils': path.resolve(__dirname, 'src/utils'),
        '@/hooks': path.resolve(__dirname, 'src/hooks'),
        '@/styles': path.resolve(__dirname, 'src/styles'),
      },
    },
  });
};
```

여기서 중요한 부분은 `alias` 옵션입니다. `tsconfig.json`에 작성한 경로와 매핑합니다.

### 4. ESLint 설치

`ESLint`는 코드를 분석하여 규칙에 어긋나는 부분을 찾아주는 코드 분석 도구입니다. 프로그램 오류, 버그, 스타일 오류 등을 표시해주기 때문에, 깔끔하고 일관적인 코드를 유지할 수 있습니다.

```bash
$ yarn add -D eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-airbnb
```

위의 코드를 터미널에 입력하여 설치합니다. 여기서는 Airbnb Style Guide를 사용하기에 `eslint-config-airbnb` 패키지도 같이 설치하였습니다.

```json
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": ["airbnb", "airbnb-base", "airbnb/hooks"],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 12,
    "sourceType": "module",
    "project": "./tsconfig.json"
  },
  "plugins": ["react", "@typescript-eslint"],
  "ignorePatterns": ["dist/", "node_modules/"],
  "rules": {}
}
```

프로젝트 상단에 `.eslintrc.json` 파일을 열어 위와 같이 작성합니다. 파일 편집 시에 Airbnb Style Guide에 따라 오류가 나타날 것입니다.

### 5. 프로젝트 실행

기본적인 프로젝트 설정은 완료했습니다.

```bash
$ yarn develop
```

프로젝트 폴더에서 위의 명령어를 통해 실행했을 때, `localhost:8000`에서 `/src/pages/index.tsx`의 내용이 정상적으로 출력되면 성공한 것입니다.
