import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { ProfileType } from "@/types/types";
import { BorderBottomOutlined } from "@ant-design/icons";

// name:

// type: "silver" | "bronze" | "gold" | "platinum";

const achievementsNames = [
  "friendly",
  "legendary",
  "photogenic",
  "sharpshooter",
  "wildfire",
  "winner",
];

const achievementsTypes = ["silver", "bronze", "gold", "platinum"];

const randomTypes = () => {
    const n = Math.floor(Math.random() * 4)
    const types = []
    for (let i = 0; i <= n; i++){
        types.push(achievementsNames[Math.floor(Math.random() * 4)])
    }
    return types
}

const randomAchievments = () => {
    const n = Math.floor(Math.random() * 10)
    const ach = []
    for (let i = 0; i <= n; i++){
        ach.push({
            name: achievementsNames[Math.floor(Math.random() * 6)],
            types: randomTypes()
        })
    }
    return ach;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const achievements = randomAchievments()
  const level = Math.random() * 15;
  const totalGame = Math.floor(Math.random() * 100);
  const GameWinn = Math.floor(Math.random() * totalGame);

  fetch("https://randomuser.me/api")
    .then((d) => d.json())
    .then((body) => {
      const result = body.results[0];
      const data = {
        id: result.login.uuid,
        username: result.login.username,
        name: {
          first: result.name.first,
          last: result.name.last,
        },
        email: result.email,
        phone: result.phone,
        gender: result.gender,
        birthday: result.dob.date,
        location: result.location.country,
        avatar: result.picture.large,
        level,
        achievements,
        matches: {
          total: totalGame,
          winne: GameWinn,
        },
      };
      res.status(200).json(data);
    })
    .catch((e) => {
      console.log(e);
      res.status(400).json({ message: "error" });
    });
}
