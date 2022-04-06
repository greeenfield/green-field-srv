# Green Field

## Table of Contents

1. [ Introduction ](#introduction)
2. [ Architecture ](#architecture)
3. [ Feature ](#feature)
4. [ Installation ](#installation)
5. [ Running the app ](#running-app)
6. [ Test ](#test)

<a name="introduction"></a>

## Introduction

---

<img src="logo.png" width="40%" height="30%" alt="GreenField Logo"></img></br>
Green Field는 1일 1커밋과 TIL에서 아이디어를 얻은 블로그입니다.</br>
강의나 글로 공부를 한 뒤, 간단하게 정리하는 요약노트 성격을 가지고있습니다.</br>
Green Field의 주 목적으로는 자신의 공부 내용을 정리 및 복습하고 잔디밭을 통한 동기부여에 있습니다.

> 이번 프로젝트를 진행하면서 가장 오랫동안 고민했던 부분은 **테스트코드**와 **올바른 아키텍쳐의 사용**이었습니다.</br>
> 수 많은 변경사항이 생기는 환경에서 예측할 수 없는 버그들을 경험했고, 테스트코드와 아키텍쳐의 부재가 얼마나 위험한지 깨달은 적이 있습니다.</br>
> 따라서 이번 프로젝트를 계획할 때 이 두 가지를 중점적으로 오랫동안 고민했고, 최종적으로 테스트코드 작성과 기능 확장이나 수정에 있어서 좋은 환경을 제공하는 DDD 아키텍쳐를 사용하게 되었습니다.

<a name="architecture"></a>

## Architecture

---

### Presentation

사용자에게 제공되는 인터페이스를 정의하고 HTTP 요청을 수신하고, 응답을 책임집니다. Controller에 해당하는 역할을 합니다.

### Application Layer

도메인 계층에 종속되어 도메인 모델의 도메인 로직을 실행합니다.</br>데이터의 상태 변화는 도메인 계층에서 진행할 수 있도록 위임합니다.
일반적으로 트랜잭션 관리, DTO 변환, 모듈 간의 연계를 책임집니다.

### Domain Layer

비즈니스 규칙과 같은 실질적인 도메인 정보를 가지고 있으며 어떤 계층에도 의존하지않는 최상위 계층입니다.</br>
Aggregate Root와 Entity로 구성된 모델 내부에 비즈니스 핵심 로직을 담고 있습니다.
리포지토리의 인터페이스는 도메인 계층에 존재하고 구현은 인프라 계층에 있습니다. 도메인 객체 팩토리의 구현 또한 도메인 계층에 존재합니다.

### Infrastructure Layer

상위계층을 지원하는 기술적인 기능을 제공하는 계층입니다. 데이터베이스 액세스, 메시징 시스템, 캐싱 또는 외부 시스템 호출 등이 포함됩니다.

<a name="feature"></a>

## Feature

---

- 회원가입, 로그인&로그아웃
- 비밀번호 재설정
- 글 작성, 수정, 삭제
- 해쉬태그 사용
- 웹 크롤러로 URL 썸네일 생성
- 날짜 별 잔디밭 생성, 잔디 하나에 대한 상세내용 확인
- 프로필 수정

<a name="installation"></a>

## Installation

---

```bash
$ npm install
```

<a name="running-app"></a>

## Running the app

---

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

<a name="test"></a>

## Test

---

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e
```
