import { useRef, useReducer } from "react";

function randomCountUser<T>(list: Array<T>, count: number) {
  let shows = [];
  for (let index = 0; index < count; index++) {
    const random = Math.floor(Math.random() * list.length);
    shows.push(list[random]);
    list[random] = list[list.length - 1];
    list.length--;
  }
  return shows;
}

type User = {
  id: string | number;
  name: string;
};

interface Award {
  name: string;
  count: number;
  time: number;
}

type Result = Record<string, User[]>;

interface InitialState {
  current: number;
  currentTime: number;
  over: boolean;
  winners: User[];
  showUsers: User[];
  result: Result;
  sure: Record<string, number[]>;
}

const reducer = (state: InitialState, payload: Partial<InitialState>) => ({
  ...state,
  ...payload,
});

export default function useLottery<A extends Award>(
  users: User[],
  awards: A[],
  sureData = {}
) {
  // 是的在进行中
  const goingRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const initailState: InitialState = {
    current: awards.length - 1,
    over: false, //是否结束
    currentTime: 0, //  当前抽了几次
    winners: [], // 已经中奖用户，拥有用户数据过滤
    result: {}, //  中奖结果输出
    showUsers: [], // 界面展示用户
    sure: sureData,
  };

  const [state, setState] = useReducer(reducer, initailState);

  const { current, over, currentTime, winners, result, showUsers, sure } =
    state;

  // 当前抽几等奖奖
  const award = awards[current];

  // 一次抽几个
  const currentNumber = award.count / award.time;
  //currentWinNumber
  const currentWinNumber = currentTime * currentNumber;

  const toggle = () => {
    if (over) {
      return;
    }
    if (!goingRef.current) {
      if (award.count > currentWinNumber) {
        const winnerIds = winners.map((w) => w.id);
        let others = winnerIds.length
          ? users.filter((u) => !winnerIds.includes(u.id))
          : users;
        goingRef.current = setInterval(() => {
          setState({
            showUsers: randomCountUser(others, currentNumber),
          });
        }, 200);
      } else {
        if (current > 0) {
          setState({
            currentTime: 0,
            showUsers: [],
            current: current - 1,
          });
        } else {
          setState({
            over: true,
          });
        }
      }
    } else {
      if (goingRef.current) {
        clearInterval(goingRef.current);

        goingRef.current = null;
      }
      let finailyShowUsers = showUsers;
      let finailySureData = { ...sure };
      if (Array.isArray(sure[award.name])) {
        finailyShowUsers = showUsers.map((p, index) => {
          let sureUser: User | undefined;
          sureUser = sure[award.name][index]
            ? users.find((u) => u.id === sure[award.name][index])
            : undefined;
          if (sureUser) {
            finailySureData[award.name] = sure[award.name].filter(
              (id) => id !== sureUser?.id
            );
            return sureUser;
          } else {
            return p;
          }
        });
      }
      let sumWinners = result[award.name] || [];
      sumWinners = sumWinners.concat(finailyShowUsers);

      setState({
        winners: [...winners, ...finailyShowUsers],
        showUsers: finailyShowUsers,
        currentTime: currentTime + 1,
        sure: finailySureData,
        result: {
          ...result,
          [award.name]: sumWinners,
        },
      });
    }
  };

  return {
    toggle,
    result,
    award,
    showUsers,
  };
}
