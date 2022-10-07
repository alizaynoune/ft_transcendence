export interface AuthType {
  username: string;
  first_name: string;
  last_name: string;
  img_url: string;
  email: string;
  intra_id: number;
  notifications: NotificationType[];
}

export interface NotificationType {
  id: string;
  isRead: boolean;
  content: string;
  user: {
    id: string;
    name: { first: string; last: string };
    username: string;
    avatar: string;
  };
  createAt: Date;
}

export interface UserType {
  id: number;
  intra_id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  img_url: string;
  cover: string;
  status: "ONLINE" | "OFFLINE" | "PLAYING";
  created_at: string;
  updated_at: string;
}

export type FriendActions = ((user: UserType, action: string) => void) | undefined

export interface RequestFriendType {
  id: number;
  senderid: number;
  receiverid: number;
  created_at: Date;
  accepted: boolean;
  userInfo: UserType;
}

export interface AchievementType {
  id: number;
  name: string;
  level: "BRONZE" | "SILVER" | "GOLD" | "PLATINUM";
  xp: number;
  description: string;
}

export interface RelationshipType {
  id: number;
  senderid: number;
  receiverid: number;
  created_at: Date;
  accepted: boolean;
  isFriend?: boolean;
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
