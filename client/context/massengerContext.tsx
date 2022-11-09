import axios from "@/config/axios";
import React, { useEffect, useState } from "react";
import { ConversationsType, MessengerContextType, MessageTextType, PromiseReturn } from "@/types/types";
import { loadToken } from "@/tools/localStorage";
import Socket from "@/config/socket";

interface PropsType {
  children: React.ReactNode;
}

export const MessengerContext = React.createContext<MessengerContextType | null>(null);

const MessengerProvider: React.FC<PropsType> = ({ children }) => {
  const [conversations, setConversations] = useState<ConversationsType[]>([]);
  const [currentConversation, setCurrentConversation] = useState<ConversationsType | null>(null);
  // const [password, setPassword] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMoreConversations, setHasMoreConversations] = useState<boolean>(false);
  const [messages, setMessages] = useState<MessageTextType[]>([]);
  const [hasMoreMessages, setHasMoreMessages] = useState<boolean>(false);

  const loadConversations = async () => {
    if (loading) return;
    setLoading(true);
    return new Promise(async (resolve, reject) => {
      try {
        // set pagenation
        const res = await axios.get("conversation");
        setConversations(res.data);
        setLoading(false);
        setHasMoreConversations(res.data === 20);
        return resolve(200);
      } catch (error) {
        console.log(error);
        return reject(error);
      }
    });
  };

  const sendMessage = (message: string) => {
    return new Promise((resolve, reject) => {
      Socket.emit("sendMessage", { id: currentConversation?.id, message }, (res: MessageTextType) => {
        console.log(res);
        console.log(res, "new message");
        setMessages((prev) => [...prev, res]);
        Socket.off("exception");
        return resolve(200);
      });
      Socket.on("exception", (error) => {
        Socket.off("exception");
        return reject(error.message);
      });
    });
  };

  const updateConversation = (update: {
    title?: string;
    public?: boolean;
    protected?: boolean;
    members?: number[];
    password?: string;
  }) => {
    return new Promise((resolve, reject) => {
      Socket.emit("updateConversation", { ...update, id: currentConversation?.id }, (res: ConversationsType) => {
        console.log(res, ">>>>>>done");
        setConversations((prev) => {
          const find = prev.find((c) => c.id === res.id);
          if (!find) return [res, ...prev];
          else {
            const filter = prev.filter((c) => c.id !== res.id);
            return [res, ...filter];
          }
        });
        setCurrentConversation(res);
        Socket.off("exception");
        return resolve(200);
      });
      Socket.on("exception", (error) => {
        Socket.off("exception");
        return reject(error.message);
      });
    });
  };

  const loadMessages = () => {
    return new Promise((resolve, reject) => {
      if (!currentConversation) return;
      const pageSize = 50;
      const data = { id: currentConversation.id, pageSize };
      if (messages.length && messages[0].conversationid === currentConversation.id)
        Object.assign(data, { cursor: messages[0].id });
      Socket.emit("getConversationMessages", data, (res: MessageTextType[]) => {
        Socket.off("exception");
        const reversData = res.reverse();
        setMessages((prev) => [...reversData, ...prev]);
        setHasMoreMessages(reversData.length === pageSize);
        resolve(200);
      });

      Socket.on("exception", (error) => {
        Socket.off("exception");
        return reject(error.message);
      });
    });
  };

  const changeCurrentConversation = (id: number, password?: string) => {
    return new Promise((resolve, reject) => {
      Socket.emit("getConversation", { id, password }, (data: ConversationsType) => {
        setMessages([]);
        Socket.off("exception");
        setCurrentConversation(data);
        resolve(200);
      });
      Socket.on("exception", (error) => {
        Socket.off("exception");
        return reject(error.message);
      });
    });
  };

  const newConversation = async (values: { members: number[]; title: string; public: boolean; password: string }) => {
    return new Promise(async (resolve, reject) => {
      Socket.emit("createConversation", values, (res: ConversationsType) => {
        setConversations((prev) => {
          const find = prev.find((c) => c.id === res.id);
          if (!find) return [res, ...prev];
          else {
            const filter = prev.filter((c) => c.id !== res.id);
            return [res, ...filter];
          }
        });
        setCurrentConversation(res);
        Socket.off("exception");
        return resolve("conversation success created");
      });
      Socket.on("exception", (error) => {
        Socket.off("exception");
        return reject(error.message);
      });
    });
  };

  useEffect(() => {
    if (!currentConversation) return;
    Socket.on("newMessage", (data: MessageTextType) => {
      if (currentConversation && currentConversation.id === data.conversationid) {
        setMessages((prev) => [...prev, data]);
      }
    });
    return () => {
      console.log("off new message");
      Socket.off("newMessage");
    };
  }, [currentConversation]);

  useEffect(() => {
    loadConversations();
    Socket.on("newConversation", (data: ConversationsType) => {
      setConversations((prev) => {
        const find = prev.find((c) => c.id === data.id);
        if (!find) return [data, ...prev];
        else {
          const filter = prev.filter((c) => c.id !== data.id);
          return [data, ...filter];
        }
      });
    });
    return () => {
      Socket.off("newConversation");
    };
  }, []);

  return (
    <MessengerContext.Provider
      value={{
        conversations,
        currentConversation,
        hasMoreConversations,
        messages,
        hasMoreMessages,
        loadConversations,
        changeCurrentConversation,
        loadMessages,
        newConversation,
        sendMessage,
        updateConversation,
      }}
    >
      {[children]}
    </MessengerContext.Provider>
  );
};

export default MessengerProvider;
