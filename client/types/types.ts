// import { AxiosError } from "axios";

declare global {
  interface Error {
    status: number;
  }
}
type PromiseReturn = Error | { message: string };
export type FriendActions = (user: UserType, action: string) => Promise<PromiseReturn>;

export interface AuthType {
  username: string;
  first_name: string;
  last_name: string;
  img_url: string;
  email: string;
  intra_id: number;
  notifications: NotificationType[];
}

export interface GameType {
  id: number;
  status: "WAITING" | "PLAYING" | "END";
  level: "EASY" | "NORMAL" | "DIFFICULT";
  createdat: Date;
  updatedat: Date;
  players: {
    id: number;
    gameid: number;
    score: number;
    users: UserType;
  }[];
}

export interface NotificationType {
  id: number;
  type: "FRIEND_REQUEST" | "GAME_INVITE" | "OTHER";
  userid: number;
  fromid: number;
  targetid: number;
  content: string;
  read: boolean;
  createdat: Date;
  updatedat: Date;
  users_notification_fromidTousers: UserType;
}

export interface UserType {
  id: number;
  intra_id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  img_url: string;
  status: "ONLINE" | "OFFLINE" | "PLAYING";
  xp: number;
  cover: string;
  created_at: string;
  updated_at: string;
}
export type updateProfileType = (update: { email: string; first_name: string; last_name: string; username: string }) => Promise<unknown>;
export interface ProfileContextType {
  loading: boolean;
  friendsList: UserType[];
  invitesList: RequestFriendType[];
  isMyProfile: boolean;
  blockedsList: UserType[];
  profile: (ProfileType & UserType & RelationshipType) | null;
  lastMatches: GameType[];
  updateProfile: updateProfileType;
  loadProfile: (profile: string | string[]) => Promise<unknown>;
  actions: FriendActions;
  loadFriends: () => Promise<unknown>;
  loadInvites: () => Promise<unknown>;
  loadBlockeds: () => Promise<unknown>;
  loadLastMatches: () => Promise<unknown>;
}

export interface BlockedListType {
  id: number;
  userid: number;
  blockedid: number;
  created_al: number;
  users_blocked_blockedidTousers: UserType;
}

export interface RequestFriendType {
  id: number;
  senderid: number;
  receiverid: number;
  created_at: Date;
  accepted: boolean;
  userInfo: UserType;
}

export interface AchievementType {
  name: "winner" | "friendly" | "photogenic" | "wildfire" | "legendary" | "sharpshooter";
  level: "BRONZE" | "SILVER" | "GOLD" | "PLATINUM";
  xp: number;
  description: string;
  wind: boolean;
}

export interface RelationshipType {
  relationship: {
    id?: number;
    senderid?: number;
    receiverid?: number;
    created_at?: Date;
    accepted?: boolean;
    isFriend?: boolean;
  };
}

export interface ProfileType {
  users_achievements: {
    achievements: AchievementType;
  }[];
  matches?: {
    total: number;
    winne: number;
  };
}

export interface ConversationsType {
  id: string;
  type: "group" | "direct";
  name: string | null;
  adminID: string;
  members: UserType[];
  lastMessage: {
    id: string;
    date: Date;
    content: string;
  };
}

export interface MessageTextType {
  id: string;
  conversationID: string;
  status: "send" | "read" | "delivered" | "failer" | "waiting" | string;
  sender: UserType;
  content: string;
  date: Date;
  deleted: boolean;
}
