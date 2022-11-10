import { ConversationMemberType } from "@/types/types";
import { StopOutlined, AudioOutlined, AudioMutedOutlined } from "@ant-design/icons";
import { Space, Button, Modal, Checkbox } from "antd";
import DatePicker, { RangePickerProps } from "antd/lib/date-picker";
import moment from "moment";
import { useState } from "react";
import ModalInviteGame from "../modalInviteGame/ModalInviteGame";

interface ProfileType {
  member: ConversationMemberType;
}

const disabledDate: RangePickerProps["disabledDate"] = (current) => {
  return current && current < moment().startOf("day");
};
const ConversationMembersActions: React.FC<ProfileType> = ({ member }) => {
  const [showModalMute, setShowModalMute] = useState<boolean>(false);
  const [showModalBan, setShowModalBan] = useState<boolean>(false);
  const [banMember, setBanMember] = useState<boolean>(member.ban);
  const [muteMember, setMuteMember] = useState<boolean>(member.mute);
  const [endBan, setEndBan] = useState<Date>();
  const [endMute, setEndMute] = useState<Date>();

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
        title={`Are you sure to ban ${member.users.username} from this conversation`}
      >
        <Space direction="vertical">
          <DatePicker
            disabled={muteMember}
            disabledDate={disabledDate}
            showTime
            placeholder="select end ban date"
            showNow={false}
            onChange={(d) => setEndBan(d?.toDate())}
          />
          <Checkbox defaultChecked={muteMember} onChange={(v) => setMuteMember(v.target.checked)}>
            {"mute forever"}
          </Checkbox>
        </Space>
      </Modal>
      <Modal
        open={showModalBan}
        onCancel={() => setShowModalBan(false)}
        title={`Are you sure to ban ${member.users.username} from this conversation`}
      >
        <Space direction="vertical">
          <DatePicker
            disabled={banMember}
            disabledDate={disabledDate}
            showTime
            placeholder="select end ban date"
            showNow={false}
            onChange={(d) => {
              setEndMute(d?.toDate());
            }}
          />
          <Checkbox defaultChecked={banMember} onChange={(v) => setBanMember(v.target.checked)}>
            {"ban forever"}
          </Checkbox>
        </Space>
      </Modal>
    </>
  );
};

export default ConversationMembersActions;
