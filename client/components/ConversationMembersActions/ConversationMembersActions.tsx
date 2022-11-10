import { StopOutlined, AudioOutlined, AudioMutedOutlined } from "@ant-design/icons";
import { Space, Button, Modal, Checkbox, message } from "antd";
import DatePicker, { RangePickerProps } from "antd/lib/date-picker";
import moment from "moment";
import { useContext, useState } from "react";
import ModalInviteGame from "../modalInviteGame/ModalInviteGame";
import { MessengerContext } from "context/massengerContext";
import { ConversationMemberType, MessengerContextType } from "@/types/types";

interface ProfileType {
  member: ConversationMemberType;
}

const disabledDate: RangePickerProps["disabledDate"] = (current) => {
  return current && current < moment().startOf("day");
};
const ConversationMembersActions: React.FC<ProfileType> = ({ member }) => {
  const [showModalMute, setShowModalMute] = useState<boolean>(false);
  const [showModalBan, setShowModalBan] = useState<boolean>(false);
  const [ban, setBanMember] = useState<boolean>(member.ban);
  const [mute, setMuteMember] = useState<boolean>(member.mute);
  const [endban, setEndban] = useState<Date>();
  const [endmute, setEndmute] = useState<Date>();
  const { muteMembers, banMembers } = useContext(MessengerContext) as MessengerContextType;

  // "userId": 1,
  // "mute": false
  // endban
  //endmute

  const handleMuteMember = async () => {
    try {
      await muteMembers({ userId: member.id, mute, endmute });
      setShowModalMute(false);
    } catch (error) {
      setShowModalMute(false);
      error instanceof Error && message.error(error.message);
    }
  };

  const handleBanMember = async () => {
    try {
      await banMembers({ userId: member.id, ban, endban });
      setShowModalBan(false);
    } catch (error) {
      setShowModalBan(false);
      error instanceof Error && message.error(error.message);
    }
  };

  return (
    <>
      <Space>
        <Button danger ghost icon={<StopOutlined />} onClick={() => setShowModalBan(true)} />
        <Button
          type="primary"
          ghost
          icon={member.mute ? <AudioOutlined /> : <AudioMutedOutlined />}
          onClick={() => setShowModalMute(true)}
        />
        <ModalInviteGame user={member.users} buttonProps={{ type: "primary", ghost: true }} />
      </Space>
      <Modal
        open={showModalMute}
        onCancel={() => setShowModalMute(false)}
        onOk={handleMuteMember}
        title={`Are you sure to mute ${member.users.username} from this conversation`}
      >
        <Space direction="vertical">
          <DatePicker
            disabled={mute}
            disabledDate={disabledDate}
            showTime
            placeholder="select end mute date"
            showNow={false}
            onChange={(d) => setEndmute(d?.toDate())}
          />
          <Checkbox defaultChecked={mute} onChange={(v) => setMuteMember(v.target.checked)}>
            {"mute forever"}
          </Checkbox>
        </Space>
      </Modal>
      <Modal
        open={showModalBan}
        onCancel={() => setShowModalBan(false)}
        onOk={handleBanMember}
        title={`Are you sure to ban ${member.users.username} from this conversation`}
      >
        <Space direction="vertical">
          <DatePicker
            disabled={ban}
            disabledDate={disabledDate}
            showTime
            placeholder="select end ban date"
            showNow={false}
            onChange={(d) => {
              setEndban(d?.toDate());
            }}
          />
          <Checkbox defaultChecked={ban} onChange={(v) => setBanMember(v.target.checked)}>
            {"ban forever"}
          </Checkbox>
        </Space>
      </Modal>
    </>
  );
};

export default ConversationMembersActions;
