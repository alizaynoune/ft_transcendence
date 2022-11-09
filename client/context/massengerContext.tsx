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
    // sendMessage
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
      console.log(id);
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
      const data = { members: values.members, title: values.title, public: values.public };
      Socket.emit("createConversation", data, (res: ConversationsType) => {
        setConversations((prev) => {
          const find = prev.find((c) => c.id === res.id);
          if (!find) return [res, ...prev];
          else {
            const filter = prev.filter((c) => c.id !== res.id);
            return [res, ...filter];
          }
        });
        setCurrentConversation(res);
        console.log(res);
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
      console.log(data, "new message recived", currentConversation?.id, data.conversationid);

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
      console.log("new conversation <<<<<<<<");
      setConversations((prev) => [data, ...prev]);
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
      }}
    >
      {[children]}
    </MessengerContext.Provider>
  );
};

export default MessengerProvider;
