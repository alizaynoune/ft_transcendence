// Create new friends data object
export const getFriends = async (data: any, userId: number) => {
  const friends = await data.filter((friend: any) => {
    if (friend.users_friends_useridTousers.intra_id === userId) {
      delete friend.users_friends_useridTousers;
      friend.userInfo = friend.users_friends_friendidTousers;
      delete friend.users_friends_friendidTousers;
      return friend;
    } else {
      delete friend.users_friends_friendidTousers;
      friend.userInfo = friend.users_friends_useridTousers;
      delete friend.users_friends_useridTousers;
      return friend;
    }
  });
  return friends;
};

// Create new invites data object
export const getInvites = async (data: any) => {
  const invites = await data.filter((invite: any) => {
    invite.userInfo = invite.users_invites_senderidTousers;
    delete invite.users_invites_senderidTousers;
    return invite;
  });
  return invites;
};
