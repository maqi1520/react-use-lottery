# react-use-lottery

react hooks for lottery.

## Installation

```bash
npm install @maqi1520/react-use-lottery
```

## Usage

```jsx
import useLottery from @maqi1520/react-use-lottery
import React from "react";

faker.setLocale("zh_CN");

const awards = [
  {
    name: "一等奖",
    count: 10,
    img: "/fc01a7a528f9c531.png",
    time: 10,
  },
  {
    name: "二等奖",
    count: 30,
    img: "/78bfc03faf8b1e2d.png",
    time: 5,
  },
  {
    name: "三等奖",
    count: 50,
    img: "/934dbc9de37038f2.png",
    time: 5,
  },
];

export default function App() {
    const users=[{ id: 1, name: "username" },...]
  const { toggle, award, showUsers, result } = useLottery(users, awards, {
    三等奖: [701, 702],
  });
  // 一次抽几个
  const currentNumber = award.count / award.time;
  const currentWinners = result[award.name] || [];

  console.log(result);

  return (
    <div>
      <button onclick={toggle}>toggle</button>
    </div>
  );
}
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
