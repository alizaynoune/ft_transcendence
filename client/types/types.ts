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

export interface UserInfoType {
    id: number;
    intra_id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    img_url: string;
    cover: string;
    status: string;
    created_at: string;
    updated_at: string;
}

export interface ProfileType {
    id: number;
    intra_id: number;
    cover: string;
    created_at: Date;
    email: string;
    first_name: string;
    img_url: string;
    last_name: number;
    status: string;
    updated_at: Date;
    username: "ONLINE" | "OFFLINE" | "PLAYING";
    users_achievements: {
        name: string;
        level: string;
    }[];
    matches: {
        total: number;
        winne: number;
    };
}

export interface UserType {
    id: number;
    senderid: number;
    receiverid: number;
    created_at: string;
    accepted: boolean;
    userInfo: {
        id: number;
        intra_id: number;
        username: string;
        email: string;
        first_name: string;
        last_name: string;
        img_url: string;
        cover: string;
        status: string;
        created_at: string;
        updated_at: string;
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
    // read: boolean;
    status: "send" | "read" | "delivered" | "failer" | "waiting" | string;
    sender: UserType;
    content: string;
    date: Date;
    deleted: boolean;
}
export interface AchievementType {
    name:
        | "Winner"
        | "Friendly"
        | "Photogenic"
        | "Wildfire"
        | "Legendary"
        | "Sharpshooter";
    types: {
        name: string;
        xp: number;
        description: string;
        wind: boolean;
    }[];
}
