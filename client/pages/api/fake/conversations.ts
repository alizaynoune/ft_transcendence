import type { NextApiRequest, NextApiResponse } from "next";
import type { ConversationsType, UserType } from "@/types/types";
import { LoremIpsum } from "lorem-ipsum";

const status = ["online", "offline", "playing"];
const ids: any[] = [];

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

function FakeText(length: any, characters: string) {
  var result = "";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const FakeUser = (data: any) => {
  const conv = data.map((d: any) => {
    ids.push(d.login.uuid);
    return {
      id: d.login.uuid,
      name: {
        first: d.name.first,
        last: d.name.last,
        username: d.login.username,
      },
      avatar: d.picture.large,
      email: d.email,
      status: status[Math.floor(Math.random() * 3)],
    };
  });
  return conv;
};

function randomDate(start: Date, end: Date) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

const FakeConversation = (users: any) => {
  let totalUsers = Math.floor(Math.random() * 40);
  totalUsers = totalUsers < 2 ? 2 : totalUsers;
  const startDate = new Date(2012, 1, 1);
  const endDate = new Date();
  const members = users.slice(0, totalUsers);
  const type = totalUsers == 2 ? "direct" : "group";
  const conv = {
    id: FakeText(
      30,
      "-ABCDEFGHIJKLMNOPQRSTUVWXYZ-abcdefghijklmnopqrstuvwxyz-0123456789-"
    ),
    type,
    name: type === "group" ? lorem.generateWords(1) : null,
    adminID: members[0].id,
    members,
    lastMessage: {
      content: lorem.generateSentences(1),
      date: randomDate(new Date(2012, 0, 1), new Date()),
    },
  };
  return conv;
};

const conversations = async(
  req: NextApiRequest,
  res: NextApiResponse<any>
) =>{
  try {
    await fetch(
      "https://randomuser.me/api/?results=40&inc=name,gender,email,nat,picture,login&noinfo"
    )
      .then((d) => d.json())
      .then((d) => {
        const rD = FakeUser(d.results);
        const resLenght = Math.floor(Math.random() * 10) + 20;
        let result = [];
        for (let i = 0; i <= resLenght; i++) {
          result.push(FakeConversation(rD));
        }
        res.status(200).json({
          total: resLenght + 1,
          result,
        });
      });
      res.status(400).json({message :"error"})
  } catch (error) {
    res.status(400).json({message :"error"})
  }
}

export default conversations
