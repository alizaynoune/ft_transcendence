import axios from '@/config/axios'
import { useEffect, useMemo, useState } from 'react'
import {UserType, FriendActions, RequestFriendType} from '@/types/types'
import { message } from 'antd'

export const useFriendHooks = () => {
  const [friendsList, setFriendsList] = useState<UserType[]>([])
  const [invitesList, setInvitesList] = useState<RequestFriendType[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const pushFriend = () => {}
  const filterFriends = () => {}
  const filterInvites = () => {}

  const actions:FriendActions = (user, action) => {
    console.log(user, action);
  }

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
  }

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
    
  }

  useEffect(() => {
    setLoading(true)
    loadFriends()
    loadInvites()
  }, [])

  return useMemo(() => ({
    friendsList,
    invitesList,
    loading,
    actions,
  }), [
    actions,
  ]);
}