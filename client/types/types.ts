export interface AuthType {
  // isAuth: boolean;
  id: string;
  email: string;
  avatar: string;
  name: {
    first: string;
    last: string;
  };
  username: string;
  token: string;
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

export interface HistoryMessengerType {
  id: string;
  type: "group" | "direct";
  password: boolean;
  users: {
    username: string;
    avatar: string;
  }[];
}

export interface ConversationsType {
  id: string;
  userId: string;
  username: string;
  read: boolean;
  message: string;
}
[];
