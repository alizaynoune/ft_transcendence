import { Button } from "antd";
import style from "./newGame.module.css";
import ListFriends from "@/components/newGameInviteFriends/NGameInviteFriends";
import { Menu, Dropdown, Select } from "antd";
import { useState } from "react";
import Link from "next/link";

const { Option } = Select;

const NewGame: React.FC = () => {
  const [gameLevel, setGameLevel] = useState<1 | 2 | 3>(1);
  const onChange = (value: 1 | 2 | 3) => {
//console.log(`selected ${value}`);
    setGameLevel(value);
  };
  return (
    <div className={style.container}>
      <Select
        className={style.selectLevel}
        showSearch={false}
        placeholder="Select level of game"
        onChange={onChange}
        size="large"
        value={gameLevel}
      >
        <Option value={1}>{" Easir "}</Option>
        <Option value={2}>{"Medium"}</Option>
        <Option value={3}>{"Difficult"}</Option>
      </Select>
      <div className={style.stageContainer}>
        <ListFriends />
        {/* racquet */}
        <div className={style.stage}>
          <div className={style.racquet}></div>
          {/* dashed line */}
          <div className={style.dashedLine}></div>
          {/* racquet */}
          <div className={style.racquet}></div>
        </div>
        <Link href="/game/id">
          <Button type="primary" size="large">
            {"Play with random user"}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NewGame;
