import { Button } from "antd";
import style from "./newGame.module.css";
import ListFriends from "@/components/newGameInviteFriends/NGameInviteFriends";
import { Menu, Dropdown, Select, Modal } from "antd";
import { useState } from "react";
import Link from "next/link";

const { Option } = Select;

const NewGame: React.FC = () => {
  const [gameLevel, setGameLevel] = useState<1 | 2 | 3>(1);
  const onChange = (value: 1 | 2 | 3) => {
    //console.log(`selected ${value}`);
    setGameLevel(value);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
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
        {/* <Link href="/game/id"> */}
        <Button type="primary" size="large"  onClick={showModal}>
        {"Play with random user"}
      </Button>
      {/* @ts-ignore */}
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
        {/* </Link> */}
      </div>
    </div>
  );
};

export default NewGame;
