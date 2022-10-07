import axios from '@/config/axios'
import { useEffect, useState } from 'react'
import {UserType, FriendActions, RequestFriendType} from '@/types/types'

export const useFriendHooks = () => {
  const [friendsList, setFriendsList] = useState<UserType[]>([])
  const [invitesList, setInvitesList] = useState<RequestFriendType[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const pushFriend = () => {}
  const filterFrien = () => {}

  const actions:FriendActions = (user, action) => {
    console.log(user, action);
  }

  const loadFriends = () => {
    console.log('loadingFriends');
  }

  const loadInvites = () => {
    console.log('loadingFriends');
    
  }

  useEffect(() => {
    setLoading(true)
    loadFriends()
    loadInvites()
  }, [])

  return [friendsList, invitesList, actions, loading]
}