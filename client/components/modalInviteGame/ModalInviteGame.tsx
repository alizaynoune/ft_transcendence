import { Modal, Button, Tooltip, Typography, Select, message, ButtonProps } from "antd";
import { UserType } from "@/types/types";
import Icon from "@ant-design/icons";
import { PlayGameIcon } from "@/icons/index";
import { useState } from "react";
import axios from "@/config/axios";

interface PropsType {
  user: UserType;
  buttonProps: ButtonProps;
}
const { Text } = Typography;
const { Option } = Select;
const ModalInviteGame: React.FC<PropsType> = (props) => {
  const { user } = props;
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [gameLevel, setGameLevel] = useState<"EASY" | "NORMAL" | "DIFFICULT">("NORMAL");

  const selectGameLevel = () => {
    return (
      <>
        <Text strong>{"Please select game level"}</Text>
        <Select
          showSearch={false}
          placeholder="Select level of game"
          onChange={(value) => {
            setGameLevel(value);
          }}
          size="large"
          value={gameLevel}
        >
          <Option value={"EASY"}>{" Easir "}</Option>
          <Option value={"NORMAL"}>{"Normal"}</Option>
          <Option value={"DIFFICULT"}>{"Difficult"}</Option>
        </Select>
      </>
    );
  };

  const handleOk = async () => {
    try {
      console.log(user.intra_id, gameLevel);
      const res = await axios.post("game/invite", { userId: user.intra_id, gameLevel });
      message.success(res.data.message);
      setOpenModal(false);
    } catch (error) {
      console.log(error);
      setOpenModal(false);
      error instanceof Error && message.error(error.message);
    }
  };

  return (
    <>
      <Tooltip title={"Invite to play game"}>
        <Button {...props.buttonProps} onClick={() => setOpenModal(true)} icon={<Icon component={PlayGameIcon} />} />
      </Tooltip>
      <Modal open={openModal} title={selectGameLevel()} onOk={handleOk} onCancel={() => setOpenModal(false)}>
        <Text type="secondary">{`you will send game invitation to ${user.username}`}</Text>
      </Modal>
    </>
  );
};

export default ModalInviteGame;
