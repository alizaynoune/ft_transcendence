import type { NextApiRequest, NextApiResponse } from "next";

interface resultType {
  login: {
    uuid: string;
    username: string;
    md5: string;
  };
  picture: {
    large: string;
  };
}

const currentGames = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await fetch(
      "https://randomuser.me/api/?results=40&inc=name,email,picture,login&noinfo"
    )
      .then((d) => d.json())
      .then((body) => {
          const { results } = body;
          const half = Math.ceil(results.length / 2);
          
          const firstHalf = results.slice(0, half);
          const secondHalf = results.slice(half);
        const data = firstHalf.map((r: resultType, key:number) => {
            return ({
                id: r.login.md5,
                users : [
                    {
                      id: r.login.uuid,
                      username: r.login.username,
                      avatar: r.picture.large,
                      score: Math.round(Math.random() * 5)
                    },
                    {
                      id: secondHalf[key].login.uuid,
                      username: secondHalf[key].login.username,
                      avatar: secondHalf[key].picture.large,
                      score: Math.round(Math.random() * 5)
                    }
                ]
            })
        })
        return res.status(200).json(data);
      });
      return res.status(400).json({message: 'error1'})
  } catch (error) {
    res.status(400).json({ message: "error" });
  }
};

export default currentGames;
