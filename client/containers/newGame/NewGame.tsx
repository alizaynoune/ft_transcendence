import { Button } from "antd";
import style from "./newGame.module.css";
import ListFriends from "@/components/newGameInviteFriends/NGameInviteFriends";
import { Menu, Dropdown, Select, Modal, Popconfirm, message } from "antd";
import type { ModalProps } from "antd";
import { useState } from "react";
import axios from "@/config/axios";

const { Option } = Select;
type PromiseReturn = Error | { message: string };

const NewGame: React.FC = () => {
  const [gameLevel, setGameLevel] = useState<"EASY" | "NORMAL" | "DIFFICULT">("NORMAL");
  const [loading, setLoading] = useState<boolean>(false);

  const handleGameLevel = (value: "EASY" | "NORMAL" | "DIFFICULT") => {
    setGameLevel(value);
  };

  const showModal = (type: ModalProps) => {
    Modal.success({
      title: "This is a warning message",
      content: "some messages...some messages...",
      okButtonProps: { danger: true },
      okText: "Leave queue",
      closable: true,
    });
  };

  const leaveQueue: () => Promise<PromiseReturn> = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.delete("/game/leavequeue");
        return resolve(res.data);
      } catch (error) {
        return reject(error);
      }
    });
  };

  const handleRegister = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/game/registerqueue", { gameLevel });
      console.log(res.data);
      setLoading(false);
      Modal.success({
        title: res.data.message,
        content: "you be redirected automatically to game after find a new player",
        okButtonProps: { danger: true },
        okText: "Leave queue",
        closable: true,
        async onOk() {
          try {
            message.success((await leaveQueue()).message);
          } catch (error) {
            error instanceof Error && message.error(error.message);
          }
        },
      });
    } catch (error) {
      console.log(error);
      if (error instanceof Error)
        if (error.message === "your already register in a queue")
          Modal.error({
            title: error.message,
            content: "do you wante to leave queue",
            okButtonProps: { danger: true },
            okText: "Leave queue",
            closable: true,
            async onOk() {
              try {
                message.success((await leaveQueue()).message);
              } catch (error) {
                error instanceof Error && message.error(error.message);
              }
            },
          });
        else message.error(error.message);
      setLoading(false);
    }
  };

  return (
    <div className={style.container}>
      <Select
        className={style.selectLevel}
        showSearch={false}
        placeholder="Select level of game"
        onChange={handleGameLevel}
        size="large"
        value={gameLevel}
      >
        <Option value={"EASY"}>{" Easir "}</Option>
        <Option value={"NORMAL"}>{"Normal"}</Option>
        <Option value={"DIFFICULT"}>{"Difficult"}</Option>
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
        <Button type="primary" size="large" loading={loading} onClick={handleRegister}>
          {"Play with random user"}
        </Button>
      </div>
    </div>
  );
};

export default NewGame;
