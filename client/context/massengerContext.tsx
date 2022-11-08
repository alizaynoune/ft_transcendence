import axios from "@/config/axios";
import React, { useEffect, useState } from "react";
import { ConversationsType, MessengerContextType, MessageTextType, PromiseReturn } from "@/types/types";
import { loadToken } from "@/tools/localStorage";
import Socket from '@/config/socket'

interface PropsType {
  children: React.ReactNode;
}

export const MessengerContext = React.createContext<MessengerContextType | null>(null);

const MessengerProvider: React.FC<PropsType> = ({ children }) => {
  const [conversations, setConversations] = useState<ConversationsType[]>([]);
  const [currentConversation, setCurrentConversation] = useState<ConversationsType | null>(null);
  const [password, setPassword] = useState<string | null>(null);
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

  const loadMessages = async () => {
    return new Promise(async (resolve, reject) => {
      if (!currentConversation) return;
      try {
        const pageSize = 50;
        const url =
          messages.length && messages[0].conversationid === currentConversation.id
            ? `conversation/${currentConversation.id}/messages?cursor=${messages[0].id}&pageSize=${pageSize}`
            : `conversation/${currentConversation.id}/messages?pageSize=${pageSize}`;
        console.log(url, password);
        const res = (await axios.post(url, { password })) as { data: MessageTextType[] };
        console.log(res.data, "loading done");
        const reversData = res.data.reverse();
        setMessages((prev) => [...reversData, ...prev]);
        setHasMoreMessages(reversData.length === pageSize);
        console.log(res.data);

        return resolve(200);
      } catch (error) {
        return reject(error);
      }
    });
  };

  const changeCurrentConversation = async (id: number, password?: string) => {
    return new Promise(async (resolve, reject) => {
      // try {
      //   const access_token = loadToken();
      //   const res = await axios.post(`conversation/${id}`, { password });
      //   console.log(res.data);
      //   setMessages([]);
      //   if (password) setPassword(password);
      //   setCurrentConversation(res.data);
      //   return resolve(res.data);
      // } catch (error) {
      //   return reject(error);
      // }
      Socket.emit('getConversation', {id, password}, (data: ConversationsType) => {
        console.log(data, '<<<<<<<<<<<<<<<<<');
        Socket.off('exception')
        setCurrentConversation(data)
        resolve(data)
      })
      // Socket.on('getConversation', data => {
      //   console.log(data, '>>>>>>>>>>>>');
      //   return resolve(data)
      // })
      Socket.on('exception', error => {
        console.log(error, '>>>>>>>>>>>>');
        Socket.off('exception')
        return reject(error.message)
      })
    });
  };

  const newConversation = async (values: { members: number[]; title: string; public: boolean; password: string }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = { members: values.members, title: values.title, public: values.public };
        if (values.password) Object.assign(data, { password: values.password });
        const res = (await axios.post("conversation/create", data)) as { data: ConversationsType };
        setConversations((prev) => {
          const find = prev.find((c) => c.id === res.data.id);
          if (!find) return [res.data, ...prev];
          else {
            const filter = prev.filter((c) => c.id !== res.data.id);
            return [res.data, ...filter];
          }
        });
        setCurrentConversation(res.data);
        return resolve("conversation success created");
      } catch (error) {
        return reject(error);
      }
    });
  };

  useEffect(() => {
    console.log("loading conversation <<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>.");

    loadConversations();
  }, []);

  return (
    <MessengerContext.Provider
      value={{
        conversations,
        currentConversation,
        conversationPassword: password,
        hasMoreConversations,
        messages,
        hasMoreMessages,
        loadConversations,
        changeCurrentConversation,
        loadMessages,
        newConversation,
      }}
    >
      {[children]}
    </MessengerContext.Provider>
  );
};

export default MessengerProvider;
