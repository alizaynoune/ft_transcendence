import { StopOutlined, AudioOutlined, AudioMutedOutlined, UserSwitchOutlined } from "@ant-design/icons";
import { Space, Button, Modal, Checkbox, message } from "antd";
import DatePicker, { RangePickerProps } from "antd/lib/date-picker";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
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
  const [endban, setEndban] = useState<Date | undefined>(member.endban);
  const [endmute, setEndmute] = useState<Date | undefined>(member.endmute);
  const [unmute, setUnmute] = useState<boolean>(false);
  const [unban, setUnban] = useState<boolean>(false);
  const { muteMembers, banMembers, toggleadmin } = useContext(MessengerContext) as MessengerContextType;

  const handleMuteMember = async () => {
    try {
      await muteMembers({
        userId: member.userid,
        mute: unmute ? false : mute,
        endmute: mute !== member.mute || unmute ? undefined : endmute,
      });
      setShowModalMute(false);
    } catch (error) {
      setShowModalMute(false);
      error instanceof Error && message.error(error.message);
    }
  };

  const handleBanMember = async () => {
    try {
      await banMembers({
        userId: member.userid,
        ban: unban ? false : ban,
        endban: ban !== member.ban || unban ? undefined : endban,
      });
      setShowModalBan(false);
    } catch (error) {
      setShowModalBan(false);
      error instanceof Error && message.error(error.message);
    }
  };

  const switchUser = () => {
    Modal.confirm({
      title: member.isadmin
        ? `Are you sure to delete admin Permission for ${member.users.username}`
        : `Are you sure to set ${member.users.username} as admin`,
      onOk: async () => {
        try {
          const res = (await toggleadmin({ userId: member.userid, setAs: !member.isadmin })) as string;
          message.success(res);
        } catch (error) {
          error instanceof Error && message.error(error.message);
        }
      },
    });
  };

  useEffect(() => {
    setBanMember(member.ban);
    setMuteMember(member.mute);
    setEndban(member.endban);
    setEndmute(member.endmute);
    setUnban(false);
    setUnmute(false);
  }, [member]);

  return (
    <>
      <Space>
        <Button ghost type="primary" danger={member.isadmin} icon={<UserSwitchOutlined />} onClick={switchUser} />
        {!member.isadmin && (
          <>
            <Button danger ghost icon={<StopOutlined />} onClick={() => setShowModalBan(true)} />
            <Button
              type="primary"
              ghost
              disabled={new Date(member.endban).getTime() > new Date().getTime() || member.ban}
              icon={member.mute ? <AudioOutlined /> : <AudioMutedOutlined />}
              onClick={() => setShowModalMute(true)}
            />
          </>
        )}
        <ModalInviteGame user={member.users} buttonProps={{ type: "primary", ghost: true }} />
      </Space>
      <Modal
        open={showModalMute}
        onCancel={() => setShowModalMute(false)}
        okButtonProps={{
          disabled: unmute
            ? false
            : !(mute !== member.mute || (endmute && new Date(endmute).getTime() !== new Date(member.endmute).getTime())),
        }}
        onOk={handleMuteMember}
        title={`Are you sure to mute ${member.users.username} from this conversation`}
      >
        <Space direction="vertical">
          {!unmute && (
            <>
              <DatePicker
                disabled={mute}
                value={moment(endmute)}
                disabledDate={disabledDate}
                showTime
                placeholder="select end mute date"
                showNow={false}
                onChange={(d) => d && setEndmute(d.toDate())}
              />
              <Checkbox
                checked={mute}
                onChange={(v) => {
                  v.target.checked ? setEndmute(undefined) : setEndmute(member.endmute);
                  setMuteMember(v.target.checked);
                }}
              >
                {"mute forever"}
              </Checkbox>
            </>
          )}
          {(new Date(member.endmute).getTime() > new Date().getTime() || member.mute) && (
            <Checkbox
              checked={unmute}
              onChange={() => {
                setUnmute(!unmute);
              }}
            >
              {"unmute"}
            </Checkbox>
          )}
        </Space>
      </Modal>
      <Modal
        open={showModalBan}
        onCancel={() => setShowModalBan(false)}
        okButtonProps={{
          disabled: unban
            ? false
            : !(ban !== member.ban || (endban && new Date(endban).getTime() !== new Date(member.endban).getTime())),
        }}
        onOk={handleBanMember}
        title={`Are you sure to ban ${member.users.username} from this conversation`}
      >
        <Space direction="vertical">
          {!unban && (
            <>
              <DatePicker
                disabled={ban}
                value={moment(endban)}
                disabledDate={disabledDate}
                showTime
                placeholder="select end ban date"
                showNow={false}
                onChange={(d) => d && setEndban(d.toDate())}
              />
              <Checkbox
                checked={ban}
                onChange={(v) => {
                  v.target.checked ? setEndban(undefined) : setEndban(member.endban);
                  setBanMember(v.target.checked);
                }}
              >
                {"ban forever"}
              </Checkbox>
            </>
          )}
          {(new Date(member.endban).getTime() > new Date().getTime() || member.ban) && (
            <Checkbox
              checked={unban}
              onChange={() => {
                setUnban(!unban);
              }}
            >
              {"unban"}
            </Checkbox>
          )}
        </Space>
      </Modal>
    </>
  );
};

export default ConversationMembersActions;
