import { Button, Space } from "antd";
import style from "./newGame.module.css";
import ListFriends from "@/components/newGameInviteFriends/NGameInviteFriends";
import { Menu, Dropdown, Select, Modal, Popconfirm, message } from "antd";
import type { ModalProps } from "antd";
import { useState } from "react";
import axios from "@/config/axios";
import { useRouter } from "next/router";

const { Option } = Select;
type PromiseReturn = Error | { message: string };

const NewGame: React.FC = () => {
  const [gameLevel, setGameLevel] = useState<"EASY" | "NORMAL" | "DIFFICULT">("NORMAL");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleGameLevel = (value: "EASY" | "NORMAL" | "DIFFICULT") => {
    setGameLevel(value);
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

  const leaveGame: () => Promise<PromiseReturn> = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const game = await axios.get("/game/");
        const res = await axios.put("/game/leaveGame", { gameId: game.data.id });
        return resolve(res.data);
      } catch (error) {
        return reject(error);
      }
    });
  };

  const backTogame: () => Promise<{ id: number } | Error> = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get("/game/");
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
      setLoading(false);
      if (res.data.game) router.push(`/game/${res.data.game.id}`);
      else
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
        else if (error.message === "you are already in a game please leave it befor register in other")
          Modal.confirm({
            title: error.message,
            // content: "do you wante to leave game",
            okButtonProps: { danger: true },
            okText: "Leave game",
            cancelText: "Back to game",
            cancelButtonProps: { type: "primary" },
            closable: true,
            async onOk() {
              try {
                message.success((await leaveGame()).message);
              } catch (error) {
                error instanceof Error && message.error(error.message);
              }
            },
            async onCancel() {
              try {
                const res = await backTogame();
                // @ts-ignore
                router.push(`/game/${res.id}`);
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
      <Space style={{ width: "100%", justifyContent: "space-between", flexDirection: "row-reverse" }}>
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
        <Button className={style.TopButton} type="primary" size="large" loading={loading} onClick={handleRegister}>
          {"Random player"}
        </Button>
      </Space>
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
        <Button className={style.CenterButton} type="primary" size="large" loading={loading} onClick={handleRegister}>
          {"Play with random user"}
        </Button>
      </div>
    </div>
  );
};

export default NewGame;
