# React 좌석 선택 도구

극장, 영화관, 야구장, 버스 등 다양한 좌석 기반의 홈페이지에서 사용할 수 있도록 개발중인 라이브러리입니다.

# Github 저장소

[Github 저장소](https://github.com/hiphop5782/hacademy-cinema)에서 소스코드를 확인하실 수 있습니다.

# 기본 설치

```sh
npm install hacademy-cinema-seat
```

# import

import는 사용하는 컴포넌트에 다음과 같이 작성합니다.

```js
import { Seat , SeatGroup } from "hacademy-cinema-seat";
```

# 제공하는 컴포넌트

## `<Seat>`
좌석 한 개를 만들기 위한 태그입니다.  
개별적으로 사용하지 않으며 `<SeatGroup>`에 포함되어 있습니다.

## `<SeatGroup>`
좌석 그룹을 만들기 위한 태그입니다.
**json** 데이터에 기반하여 좌석을 생성하며, 체크 등 각종 이벤트를 제공합니다.