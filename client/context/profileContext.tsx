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
  GameType,
} from "@/types/types";
import { message } from "antd";
import { useAppSelector } from "@/hooks/reduxHooks";
import { selectAuth } from "@/store/reducers/auth";
import { read } from "fs";

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
  const [lastMatches, setLastMatches] = useState<GameType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isMyProfile, setIsMyProfile] = useState<boolean>(false);
  const { intra_id } = useAppSelector(selectAuth);

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
    unblock: [filterBlockeds],
    unfriend: [filterFriends],
  };

  const actions: FriendActions = (user, action) => {
    setLoading(true);
    return new Promise(async (resolve, reject) => {
      try {
        const body = action.split("/")[0] === "game" ? { userId: user.intra_id } : { id: user.intra_id.toString() };
        console.log(body, action.split("/"), action);
        const res = await axios.post(action, body);
        setLoading(false);
        const fnIndex = action.split("/")[1];
        if (fnIndex in fns) fns[fnIndex].forEach((f) => f(user));
        return resolve(res.data);
      } catch (error) {
        setLoading(false);
        return reject(error);
      }
    });
  };

  const loadProfile = async (profile: string | string[]) => {
    setLoading(true);
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(`profile/${profile}`);
        setIsMyProfile(res.data.intra_id === intra_id);
        setProfile(res.data);
        setLoading(false);
        return resolve(200);
      } catch (error) {
        setProfile(null);
        setLoading(false);
        return reject(error);
      }
    });
  };

  const loadFriends = async () => {
    setLoading(true);
    setFriendsList([]);
    return new Promise(async (resolve, reject) => {
      const url = isMyProfile ? "/" : `/user/${profile?.username}`;
      try {
        const res = await axios.get(`friends${url}`);
        if (res.data.friends) {
          setFriendsList(res.data.friends.map((f: { userInfo: UserType }) => f.userInfo));
        }
        setLoading(false);
        return resolve(friendsList);
      } catch (error) {
        setLoading(false);
        return reject(error);
      }
    });
  };

  const loadInvites = async () => {
    setLoading(true);
    setInvitesList([]);
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get("/friends/invites");
        setInvitesList(res.data.invites);
        setLoading(false);
        return resolve(invitesList);
      } catch (error) {
        setLoading(false);
        return reject(error);
      }
    });
  };

  const loadBlockeds = async () => {
    setLoading(true);
    setBlockedsList([]);
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get("friends/blocked");
        console.log(res.data);
        if (res.data.constructor !== Array) return resolve([]);
        const data = res.data.map((i: { users_blocked_blockedidTousers: UserType }) => i.users_blocked_blockedidTousers);
        setBlockedsList(data);
        setLoading(false);
        return resolve(blockedsList);
      } catch (error) {
        setLoading(false);
        return reject(error);
      }
    });
  };

  const loadLastMatches = async () => {
    setLoading(true);
    setLastMatches([]);
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get("game/history");
        const data = res.data.map((d: { game: any }) => {
          if (d.game.players[0] !== intra_id) {
            [d.game.players[1], d.game.players[0]] = [d.game.players[0], d.game.players[1]];
          }
          return d.game;
        });
        setLoading(false);
        setLastMatches(data);
        return resolve(lastMatches);
      } catch (error) {
        setLoading(false);
        return reject(error);
      }
    });
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
        lastMatches,
        updateProfile,
        loadProfile,
        actions,
        loadFriends,
        loadInvites,
        loadBlockeds,
        loadLastMatches,
      }}
    >
      {[children]}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;
