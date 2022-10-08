import axios from "@/config/axios";
import React, { useEffect, useState } from "react";
import { UserType, FriendActions, RequestFriendType, ProfileContextType } from "@/types/types";
import { message } from "antd";
import { useAppSelector } from "@/hooks/reduxHooks";
import { selectAuth } from "@/store/reducers/auth";
import { resolve } from "path";
import { reject } from "lodash";

interface PropsType {
  children: React.ReactNode;
}
type fnsType = (user: UserType) => void

export const ProfileContext = React.createContext<ProfileContextType | null>(null);

const ProfileProvider: React.FC<PropsType> = ({ children }) => {
  const [friendsList, setFriendsList] = useState<UserType[]>([]);
  const [invitesList, setInvitesList] = useState<RequestFriendType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isMyProfile, setIsMyProfile] = useState<boolean>(false);
  const { intra_id } = useAppSelector(selectAuth);

  const filterFriends:fnsType = (user) => {
    setFriendsList(prev => prev.filter(f => f.intra_id !== user.intra_id))    
  };
  const pushFriend:fnsType = (user) => {
    setFriendsList(prev => [user, ...prev])
  };
  const filterInvites:fnsType = (user) => {
    setInvitesList(prev => prev.filter(i => i.userInfo.intra_id !== user.intra_id))
  };
  const checkeIsMyProfile = (id: number) => setIsMyProfile(id === intra_id);
  const fns: {[k: string]: fnsType[]} = {
    rejectrequest: [filterInvites],
    acceptrequest: [filterInvites, pushFriend],
    blockfriend: [filterFriends]
  }


  const actions: FriendActions = (user, action) => {
    setLoading(true);
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(`friends/${action}`, { id: user.intra_id.toString() });
        setLoading(false);
        if (action in fns) fns[action].forEach(f => f(user))
        return resolve(res.data);
      } catch (error) {
        setLoading(false);
        return reject(error);
      }
    });
  };

  const loadFriends = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const res = await axios.get("friends"); //todo change to get list friends by username or id
      if (res.data.friends) {
        setFriendsList(res.data.friends.map((f: { userInfo: UserType }) => f.userInfo));
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      error instanceof Error && message.error(error.message);
    }
  };

  const loadInvites = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const res = await axios.get("/friends/invites");
      console.log(res.data);
      setInvitesList(res.data.invites);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <ProfileContext.Provider
      value={{ loading, friendsList, invitesList, isMyProfile, actions, loadFriends, loadInvites, checkeIsMyProfile }}
    >
      {[children]}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;
