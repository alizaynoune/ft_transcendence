import style from "./RequestList.module.css";
import React, { useEffect, useState } from "react";
import { List } from "antd";
import UserCard from "@/components/userCard/UserCard";
import axios from "@/config/axios";
import { message } from "antd";

interface DataType {
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

const FriendRequestList: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<DataType[]>([]);

    const loadMoreData = async () => {
        if (loading) {
            return;
        }
        setLoading(true);
        try {
            const res = await axios.get("/friends/invites");
            console.log(res.data);
            setData(res.data.invites);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const action = async (id: number, action: string) => {
        try {
            const res = await axios.post(`friends/${action}`, {
                id
                : id.toString(),
            });
            setData((prev) => prev.filter((i) => i.senderid !== id));
            message.success(res.data.message);
        } catch (error: unknown) {
            error instanceof Error && message.error(error.message);
        }
    };

    useEffect(() => {
        loadMoreData();
    }, []);

    return (
        <div className={style.container}>
            <List
                dataSource={data}
                itemLayout="horizontal"
                grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 1,
                    md: 2,
                    lg: 2,
                    xl: 3,
                    xxl: 3,
                }}
                pagination={{
                    onChange: (page) => {
                        //console.log(page);
                    },
                    total: data.length,
                    pageSize: 16,
                }}
                renderItem={(item) => (
                    <UserCard
                        user={item.userInfo}
                        type="request"
                        action={action}
                    />
                )}
            />
        </div>
    );
};

export default FriendRequestList;
