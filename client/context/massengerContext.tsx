import axios from "@/config/axios";
import React, { useEffect, useState } from "react";
import { ConversationsType, MessengerContextType, MessageTextType } from "@/types/types";
import Socket from "@/config/socket";

interface PropsType {
  children: React.ReactNode;
}

export const MessengerContext = React.createContext<MessengerContextType | null>(null);

const MessengerProvider: React.FC<PropsType> = ({ children }) => {
  const [conversations, setConversations] = useState<ConversationsType[]>([]);
  const [currentConversation, setCurrentConversation] = useState<ConversationsType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMoreConversations, setHasMoreConversations] = useState<boolean>(false);
  const [messages, setMessages] = useState<MessageTextType[]>([]);
  const [hasMoreMessages, setHasMoreMessages] = useState<boolean>(false);

  const muteMembers = async (values: { userId: number; mute: boolean; endmute?: Date }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const update = await axios.put(`conversation/${currentConversation?.id}/togglemute`, values);
        console.log(update.data);
        setCurrentConversation(update.data);
        return resolve(200);
      } catch (error) {
        return reject(error);
      }
    });
  };

  const banMembers = async (values: { userId: number; ban: boolean; endban?: Date }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const update = await axios.put(`conversation/${currentConversation?.id}/toggleban`, values);
        console.log(update.data);
        setCurrentConversation(update.data);
        return resolve(200);
      } catch (error) {
        return reject(error);
      }
    });
  };

  const loadConversations = async () => {
    if (loading) return;
    setLoading(true);
    return new Promise(async (resolve, reject) => {
      try {
        const pageSize = 50;
        const url = conversations.length
          ? `conversation/?cursor=${conversations.at(-1)?.id}&pageSize=${pageSize}`
          : `conversation/?pageSize=${pageSize}`;
        const res = (await axios.get(url)) as { data: ConversationsType[] };
        setConversations(res.data);
        setLoading(false);
        setHasMoreConversations(res.data.length === pageSize);
        return resolve(200);
      } catch (error) {
        return reject(error);
      }
    });
  };

  const loadMessages = () => {
    return new Promise(async (resolve, reject) => {
      if (!currentConversation) return;
      try {
        const pageSize = 50;
        const url =
          messages.length && messages[0].conversationid === currentConversation.id
            ? `conversation/${currentConversation.id}/messages?cursor=${messages[0].id}&pageSize=${pageSize}`
            : `conversation/${currentConversation.id}/messages?pageSize=${pageSize}`;
        const res = (await axios.get(url)) as { data: MessageTextType[] };
        const reversData = res.data.reverse();
        setMessages((prev) => [...reversData, ...prev]);
        setHasMoreMessages(reversData.length === pageSize);
        return resolve(200);
      } catch (error) {
        return reject(error);
      }
    });
  };

  const deleteConversation = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.delete(`/conversation/${currentConversation?.id}/delete`);
        console.log(res.data);
        return resolve(res.data);
      } catch (error) {
        return reject(error);
      }
    });
  };

  const sendMessage = (message: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = (await axios.post(`/conversation/${currentConversation?.id}/message`, { message })) as {
          data: MessageTextType;
        };
        setMessages((prev) => [...prev, res.data]);
        return resolve(200);
      } catch (error) {
        return reject(error);
      }
    });
  };

  const updateConversation = (update: {
    title?: string;
    public?: boolean;
    protected?: boolean;
    members?: number[];
    password?: string;
  }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = (await axios.put(`/conversation/${currentConversation?.id}/update`, update)) as { data: ConversationsType };
        setConversations((prev) => {
          return prev.map((c) => {
            if (c.id === res.data.id) return res.data;
            return c;
          });
        });
        setCurrentConversation(res.data);
        return resolve("success update");
      } catch (error) {
        return reject(error);
      }
    });
  };

  const leaveConversation = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.put(`conversation/${currentConversation?.id}/leave/`);
        setConversations((prev) => {
          return prev.filter((c) => c.id !== currentConversation?.id);
        });
        // setCurrentConversation(null);
        return resolve(res.data);
      } catch (error) {
        return reject(error);
      }
    });
  };

  const changeCurrentConversation = (id: number, password?: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (currentConversation) Socket.emit("leaveChatRoom", { id: currentConversation.id });
        const res = await axios.post(`/conversation/${id}`, { password });
        setMessages([]);
        setCurrentConversation(res.data);
        return resolve(200);
      } catch (error) {
        reject(error);
      }
    });
  };

  const newConversation = async (values: { members: number[]; title: string; public: boolean; password?: string }) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (currentConversation) Socket.emit("leaveChatRoom", { id: currentConversation.id });
        const res = (await axios.post(`/conversation/create`, values)) as { data: ConversationsType };
        setMessages([]);
        setConversations((prev) => {
          const find = prev.find((c) => c.id === res.data.id);
          if (!find) return [res.data, ...prev];
          else {
            const filter = prev.filter((c) => c.id !== res.data.id);
            return [res.data, ...filter];
          }
        });
        setCurrentConversation(res.data);
        return resolve("seccess create");
      } catch (error) {
        return reject(error);
      }
    });
  };

  const joinConversation = async (id: number, password?: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (currentConversation) Socket.emit("leaveChatRoom", { id: currentConversation.id });
        const res = (await axios.post(`/conversation/${id}/join`, { password })) as { data: ConversationsType };
        setMessages([]);
        setConversations((prev) => {
          const find = prev.find((c) => c.id === res.data.id);
          if (!find) return [res.data, ...prev];
          else {
            const filter = prev.filter((c) => c.id !== res.data.id);
            return [res.data, ...filter];
          }
        });
        setCurrentConversation(res.data);
        return resolve("success join");
      } catch (error) {
        return reject(error);
      }
    });
  };

  const toggleadmin = async (values: { userId: number; setAs: boolean }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = (await axios.put(`conversation/${currentConversation?.id}/toggleadmin`, values)) as {
          data: ConversationsType;
        };
        setCurrentConversation(res.data);
        return resolve("success update");
      } catch (error) {
        return reject(error);
      }
    });
  };

  useEffect(() => {
    if (!currentConversation) return;
    // setMessages([]);
    Socket.on("newMessage", (data: MessageTextType) => {
      if (currentConversation && currentConversation.id === data.conversationid) {
        setMessages((prev) => [...prev, data]);
      }
    });

    Socket.on("updateConversation", (update: ConversationsType) => {
      if (currentConversation.id === update.id) {
        console.log(currentConversation, update, "<<<<<<<<<<<<<<>>>>>>>>>>>>>>>");
        setMessages([]);
        setCurrentConversation((prev) => {
          if (!prev?.protected && update.protected) return null;
          else return update;
        });
      }
    });

    return () => {
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
          return prev.map((c) => {
            if (c.id === data.id) return data;
            return c;
          });
        }
      });
    });

    Socket.on("updateConversation", (update: ConversationsType) => {
      setConversations((prev) => {
        const find = prev.find((c) => c.id === update.id);
        if (!find) return [update, ...prev];
        else {
          return prev.map((c) => {
            if (c.id === update.id) return update;
            return c;
          });
        }
      });
    });

    return () => {
      Socket.off("newConversation");
      Socket.off("updateConversation");
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
        leaveConversation,
        banMembers,
        muteMembers,
        deleteConversation,
        joinConversation,
        toggleadmin,
      }}
    >
      {[children]}
    </MessengerContext.Provider>
  );
};

export default MessengerProvider;
