export interface AuthType {
  username: string;
  first_name: string;
  last_name: string;
  img_url: string
}

export interface NotificationType {
  id: string;
  type: string; // ! change it
  user: {
    name: string;
    avatar: string;
  };
  read: boolean;
  content: string;
  date: Date;
}

export interface ProfileType {
  id: string;
  username: string;
  name: {
    first: string;
    last: string;
  };
  email: string;
  phone: string;
  gender: string;
  birthday: string;
  location: string;
  avatar: string;
  level: number;
  achievements: {
    name: string;
    types: string[];
  }[];
  matches: {
    total: number;
    winne: number;
  };
}

export interface UserType {
  id: string;
  name: {
    first: string;
    last: string;
    username: string;
  };
  avatar: string;
  email: string;
  status: "online" | "offline" | "playing";
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
  // read: boolean;
  status: 'send' | 'read' | 'delivered' | 'failer' | 'waiting' | string;
  sender: UserType;
  content: string;
  date: Date;
  deleted: boolean;
}
export interface AchievementType {
  name: "Winner" | "Friendly" | "Photogenic" | "Wildfire" | "Legendary" | "Sharpshooter";
  types: {
    name: string;
    xp: number;
    description: string;
    wind: boolean;
  }[];
}
