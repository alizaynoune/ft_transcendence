// import { AxiosError } from "axios";

declare global {
  interface Error {
    status: number;
  }
}
export type PromiseReturn = Error | { message: string };
export type ActionsType =
  | "message"
  | "game/invite"
  | "friends/blockfriend"
  | "friends/unfriend"
  | "friends/unblock"
  | "friends/rejectrequest"
  | "friends/acceptrequest"
  | "friends/sendrequest";
export type FriendActions = (user: UserType, action: ActionsType) => Promise<PromiseReturn>;

export interface AuthType {
  username: string;
  first_name: string;
  last_name: string;
  img_url: string;
  email: string;
  intra_id: number;
  updated_at: Date | null;
  created_at: Date | null;
  notifications: NotificationType[];
}

export interface GameType {
  id: number;
  status: "WAITING" | "PLAYING" | "END";
  level: "EASY" | "NORMAL" | "DIFFICULT";
  started: boolean;
  created_at: Date;
  updated_at: Date;
  players: {
    id: number;
    gameid: number;
    score: number;
    ready: boolean;
    users: UserType;
  }[];
}

export interface NotificationType {
  id: number;
  type: "FRIEND_REQUEST" | "GAME_INVITE" | "GAME_ACCEPTE" | "OTHER";
  userid: number;
  fromid: number;
  targetid: number;
  content: string;
  read: boolean;
  created_at: Date;
  updated_at: Date;
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
export type updateProfileType = (update: {
  email: string;
  first_name: string;
  last_name: string;
  username: string;
}) => Promise<unknown>;
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
  name: "friendly" | "photogenic" | "wildfire" | "legendary" | "sharpshooter";
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

export interface ConversationMemberType {
  id: number;
  conversationid: number;
  userid: number;
  mute: boolean;
  active: boolean;
  ban: boolean;
  endmute: Date;
  endban: Date;
  isadmin: boolean;
  created_at: Date;
  updated_at: Date;
  users: UserType;
}

export interface ConversationsType {
  id: number;
  title: string;
  type: "GROUP" | "DIRECT";
  active: boolean;
  created_at: Date;
  updated_at: Date;
  public: boolean;
  protected: boolean;
  members: ConversationMemberType[];
}

export interface MessageTextType {
  id: number;
  message: string;
  senderid: number;
  conversationid: number;
  created_at: Date;
  updated_at: Date;
  users: UserType;
}

export interface MessengerContextType {
  conversations: ConversationsType[];
  currentConversation: ConversationsType | null;
  hasMoreConversations: boolean;
  messages: MessageTextType[];
  hasMoreMessages: boolean;
  loadConversations: () => Promise<unknown>;
  changeCurrentConversation: (id: number, password?: string) => Promise<unknown>;
  loadMessages: () => Promise<unknown>;
  newConversation: (values: { members: number[]; title: string; public: boolean; password?: string }) => Promise<unknown>;
  sendMessage: (message: string) => Promise<unknown>;
  updateConversation: (values: {
    members?: number[];
    title?: string;
    public?: boolean;
    password?: string;
    protected?: boolean;
  }) => Promise<unknown>;
  leaveConversation: () => Promise<unknown>;
  banMembers: (values: { userId: number; ban: boolean; endban?: Date }) => Promise<unknown>;
  muteMembers: (values: { userId: number; mute: boolean; endmute?: Date }) => Promise<unknown>;
  deleteConversation: () => Promise<unknown>;
}
