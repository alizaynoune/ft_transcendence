import axios from "@/config/axios";
import React, { useEffect, useState } from "react";
import {
  UserType,
  FriendActions,
  RequestFriendType,
  ProfileContextType,
  BlockedListType,
  RelationshipType,
  ProfileType,
  updateProfileType,
} from "@/types/types";
import { message } from "antd";
import { useAppSelector } from "@/hooks/reduxHooks";
import { selectAuth } from "@/store/reducers/auth";

interface PropsType {
  children: React.ReactNode;
}
type fnsType = (user: UserType) => void;

export const ProfileContext = React.createContext<ProfileContextType | null>(null);

const ProfileProvider: React.FC<PropsType> = ({ children }) => {
  const [profile, setProfile] = useState<(ProfileType & UserType & RelationshipType) | null>(null);
  const [friendsList, setFriendsList] = useState<UserType[]>([]);
  const [invitesList, setInvitesList] = useState<RequestFriendType[]>([]);
  const [blockedsList, setBlockedsList] = useState<UserType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isMyProfile, setIsMyProfile] = useState<boolean>(false);
  const { intra_id } = useAppSelector(selectAuth);

  const loadProfile = async (profile: string | string[]) => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(`profile/${profile}`);
        setIsMyProfile(res.data.intra_id === intra_id);
        setProfile(res.data);
        return resolve(200);
      } catch (error) {
        setProfile(null);
        return reject(error);
      }
    });
  };

  const updateProfile: updateProfileType = async (update) => {
    setLoading(true);
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.put("/users/update", update);
        const data = (({ username, email, first_name, last_name }) => ({ username, email, first_name, last_name }))(res.data) as
          | (ProfileType & UserType & RelationshipType)
          | null;
        setProfile((prev) => Object.assign({ ...prev }, data));
        setLoading(false);
        return resolve(res.data);
      } catch (error) {
        setLoading(false);
        return reject(error);
      }
    });
  };

  const filterFriends: fnsType = (user) => {
    setFriendsList((prev) => prev.filter((f) => f.intra_id !== user.intra_id));
  };
  const pushFriend: fnsType = (user) => {
    setFriendsList((prev) => [user, ...prev]);
  };
  const filterInvites: fnsType = (user) => {
    setInvitesList((prev) => prev.filter((i) => i.userInfo.intra_id !== user.intra_id));
  };

  const pushBlocked: fnsType = (user) => {
    setBlockedsList((prev) => [user, ...prev]);
  };

  const filterBlockeds: fnsType = (user) => {
    setBlockedsList((prev) => prev.filter((b) => b.intra_id !== user.intra_id));
  };

  const fns: { [k: string]: fnsType[] } = {
    rejectrequest: [filterInvites],
    acceptrequest: [filterInvites, pushFriend],
    blockfriend: [filterFriends, pushBlocked],
    Unblock: [filterBlockeds],
    unfriend: [filterFriends],
  };

  const actions: FriendActions = (user, action) => {
    setLoading(true);
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(`friends/${action}`, { id: user.intra_id.toString() });
        setLoading(false);
        if (action in fns) fns[action].forEach((f) => f(user));
        return resolve(res.data);
      } catch (error) {
        setLoading(false);
        return reject(error);
      }
    });
  };

  const loadFriends = async () => {
    setLoading(true);
    setFriendsList([]);
    const url = isMyProfile ? "/" : `/user/${profile?.username}`;
    try {
      const res = await axios.get(`friends${url}`);
      if (res.data.friends) {
        setFriendsList(res.data.friends.map((f: { userInfo: UserType }) => f.userInfo));
      }
      setLoading(false);
    } catch (error) {
      error instanceof Error && message.error(error.message);
    }
  };

  const loadInvites = async () => {
    setLoading(true);
    setInvitesList([]);
    try {
      const res = await axios.get("/friends/invites");
      setInvitesList(res.data.invites);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const loadBlockeds = async () => {
    setLoading(true);
    setBlockedsList([]);
    try {
      const res = await axios.get("friends/blocked");
      const data = res.data.map((i: { users_blocked_blockedidTousers: UserType }) => i.users_blocked_blockedidTousers);
      setBlockedsList(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        loading,
        friendsList,
        invitesList,
        isMyProfile,
        blockedsList,
        profile,
        updateProfile,
        loadProfile,
        actions,
        loadFriends,
        loadInvites,
        loadBlockeds,
      }}
    >
      {[children]}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;
