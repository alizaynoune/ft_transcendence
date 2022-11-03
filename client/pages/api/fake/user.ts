import type { NextApiRequest, NextApiResponse } from "next";

const achievementsNames = [
  "friendly",
  "legendary",
  "photogenic",
  "sharpshooter",
  "wildfire",
];

const achievementsTypes = ["silver", "bronze", "gold", "platinum"];

const randomTypes = () => {
    const n = Math.floor(Math.random() * 3)
    const types = []
    for (let i = 0; i <= n; i++){
        types.push(achievementsTypes[Math.floor(Math.random() * 4)])
    }
    return types
}

const randomAchievments = () => {
    const n = Math.floor(Math.random() * 8)
    const ach = []
    for (let i = 0; i <= n; i++){
        ach.push({
            name: achievementsNames[Math.floor(Math.random() * 6)],
            types: randomTypes()
        })
    }
    return ach;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const achievements = randomAchievments()
  const level = Math.random() * 15;
  const totalGame = Math.floor(Math.random() * 100);
  const GameWinn = Math.floor(Math.random() * totalGame);

  await fetch("https://randomuser.me/api")
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
//console.log(e);
      res.status(400).json({ message: "error" });
    });
}
