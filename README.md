# Correct Sentences

Correct Sentences는 영어 문장을 입력하면 올바르게 교정해주는 애플리케이션이다.

---

## Inspiration

혼자서 영어를 공부하면서 틀린 문장을 교정받을 수 없었기 때문에 잘못된 표현을 익히는 것 같았다. 돈을 들이지 않고 손쉽게 영어를 배울 수 있는 방법이 없을까 고민하다가 OpenAI를 접하게 되었다.

OpenAI에 질문을 하여 내가 원하는 답을 얻을 수 있기 때문에 나의 AI 영어선생님이 되기에 아주 적합하다 여겼다.

---

## Stacks

### Environment

<img src="https://img.shields.io/badge/Visual Studio Code-007ACC?style=flat-square&logo=VisualStudioCode&logoColor=white"/>
<img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=GitHub&logoColor=white"/>
<img src="https://img.shields.io/badge/Figma-F24E1E?style=flat-square&logo=Figma&logoColor=white"/>

### Development

<img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=Next.js&logoColor=white"/>
<img src="https://img.shields.io/badge/CSS Modules-000000?style=flat-square&logo=cssmodules&logoColor=white"/>

#### Next.js를 사용한 이유

Next.js는 React 라이브러리의 프레임워크이다. 기본적으로 React는 Client Side Rendering(CSR)를 한다. 웹사이트를 요청했을 때 빈 html을 가져와 script를 로딩하기 때문에 첫 로딩 시간도 오래걸리고 Search Engine Optimization(SEO)에 취약하다는 단점이 있다.

반면 Next.js는 pre-reloading을 통해 미리 데이터가 렌더링된 페이지를 가져올수 있게 해주므로 사용자에게 더 좋은 경험을 주고 검색 엔진에 잘 노출 될 수 있도록 해주는 SEO에서도 장점을 얻을 수 있다. pre-reloading은 SSR 뿐만 아니라 SSG(Static-Site Generate)도 가능하게 해준다.

---

## Functions

#### 1. 영어 문장 입력하기

#### 2. 올바른 영어 문장으로 교정하기

#### 3. 교정된 문장 음성으로 듣기

#### 4. 교정된 문장 클립보드에 복사하기

---

## Demo

Not yet

---

## Try it out

Not yet

---

## Run it locally

### Requirements

For building and running the application you need:

[Node.js 18.13.0](https://nodejs.org/ca/blog/release/v18.13.0/)  
[Npm 8.19.3](https://www.npmjs.com/package/npm/v/8.19.3)

### Installation

```
git clone https://github.com/YeonsuBaek/learning-english.git

npm install
npm run dev
```

---

## I learned it

1. OpenAI API

[OpenAI 사용하는 법 정리한 포스트](https://velog.io/@yeonsubaek/%EB%A6%AC%EC%95%A1%ED%8A%B8%EB%A1%9C-chatGPT-%ED%99%9C%EC%9A%A9%ED%95%98%EA%B8%B0)

2. Speech Synthesis

자바스크립트가 제공하는 내장 Web Speech API인 Speech Synthesis를 사용하였다.

[Text To Speech 사용법에 대한 포스트](https://velog.io/@yeonsubaek/JavaScript)

3. react-copy-to-clipboard

react-copy-to-clipboard 라이브러리를 이용하여 클릭 시 텍스트가 클립보드에 복사되는 기능을 구현하였다.
