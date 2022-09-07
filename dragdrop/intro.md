## 프로젝트 설정

### 모듈

자바 스크립트 모듈(개요): https://medium.com/computed-comparisons/commonjs-vs-amd-vs-requirejs-vs-es6-modules-2e814b114a0b

ES 모듈 관련 추가 정보: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules

### webpack

일반적인 es6의 모듈시스템을 이용하면 import구문을 만날때마다 해당 파일을 서버에 요청하고 다운로드 하는 식으로 진행된다.

- 일반적인 다운로드 시간은 파일시스템에 의존하지만
- 서버입장에서 잦은 http요청은 대기시간을 발생시켜 프로젝트가 느리게 빌드 될 수 있다.

웹팩은 파일을 번들화(여러파일을 하나의 파일로 묶어줌)하고,빌드하고,종합하는 도구이다.

- 웹팩에 묶인 코드들은 일반적으로 최적화된다.
- 빌드절차를 쉽게 해준다  
- 추가 빌드툴을 제공한다.

#### Loaders

webpack은 기본적으로 JavaScript와 JSON 파일만 이해합니다. **로더를** 사용하면 webpack이 다른 유형의 파일을 처리하거나, 그들을 유효한 [모듈](https://webpack.kr/concepts/modules)로 변환 하여 애플리케이션에서 사용하거나 디펜던시 그래프에 추가합니다.

- 로더는 웹팩에게 특정파일을 어떻게 다룰지를 전달해주는 패키지이다.

##### plugins

로더는 특정 유형의 모듈을 변환하는 데 사용되지만, 플러그인을 활용하여 번들을 최적화하거나, 애셋을 관리하고, 또 환경 변수 주입등과 같은 광범위한 작업을 수행 할 수 있습니다.

___

"lite-server": 

"ts-loader": 웹팩에게 어떻게 코드를 자바스크립트로 변환할지 전달하게 한다. 

"typescript": 

"webpack": 웹팩

"webpack-cli": 프로젝트내에서 웹팩 명령어를 실행하기 위해 필요

"webpack-dev-server": 개발 서버내에서 빌드하기위해 필요



____

> 참조
>
> https://webpack.kr/
>
> https://yamoo9.gitbook.io/webpack/

