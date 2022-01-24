import faker from "@faker-js/faker";
import React from "react";
import cn from "classnames";
import useLottery from "./useLottery";

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

const getUsers = () => {
  let users = new Array(700).fill(null).map((_item, index) => ({
    id: index + 1,
    name: faker.name.lastName() + faker.name.firstName(),
  }));
  localStorage.setItem("user", JSON.stringify(users));

  return [{ id: 702, name: "小马2" }, { id: 701, name: "小马1" }, ...users];
};
const users = getUsers();

export default function App() {
  const { toggle, award, showUsers, result } = useLottery(users, awards, {
    三等奖: [701, 702],
  });
  // 一次抽几个
  const currentNumber = award.count / award.time;
  const currentWinners = result[award.name] || [];

  console.log(result);

  return (
    <div
      onClick={() => toggle()}
      className="h-screen bg-gradient-to-b  from-red-800 to-red-400"
    >
      <div className="container mx-auto h-full flex flex-col">
        <div className="flex-shrink-0">
          <div className="text-8xl text-center text-yellow-500 py-20">
            杭州 JS 酷科技 2021 年度抽奖仪式
          </div>
        </div>
        <div className="grid md:grid-cols-1 lg:grid-cols-4 flex-grow border-1 border-yellow-500 border-solid">
          <div className="col-span-1 text-center grid place-content-center">
            <img className="w-full" src={award.img} alt="" />
            <div className="text-6xl text-white">{award.name}</div>
            <div className="text-4xl text-yellow-500 mt-10">
              ({currentWinners.length}/{award.count})
            </div>
          </div>

          <div
            className={cn("col-span-3 grid place-self-stretch gap-10", {
              "grid-cols-1": currentNumber === 1,
              "grid-cols-2": currentNumber > 1,
            })}
          >
            {showUsers.map((user) => (
              <div
                key={user.id}
                className="font-semibold bg-black bg-opacity-20 text-white text-5xl  flex justify-center items-center"
              >
                <span>{user.name}</span>
                <span className="ml-10">GH{user.id}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-shrink-0">
          <div className="text-xl text-center text-white py-10">
            @微信公众号 “JS 酷”
          </div>
        </div>
      </div>
    </div>
  );
}
