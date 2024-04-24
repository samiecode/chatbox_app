import { useEffect } from "react";
export default function SupportUser({
    conversation,
    setMessages,
    setCurrentConversation,
}) {
    const getMessages = async (id) => {
        const res = await axios.get(route("support.show", id));
        setMessages(res.data);
        if (res.status) {
            setCurrentConversation(conversation);
        }
    };

    return (
        <div
            onClick={() => {
                getMessages(conversation?.id);
            }}
            href={route("support.show", conversation?.id)}
            className="flex items-center gap-4 p-3 group hover:bg-gray-50 transition-all duration-400 rounded-xl"
        >
            <div className="h-10 w-10 bg-gray-200 animate-pulse rounded-full group-hover:bg-white transition duration-300"></div>
            <div className="flex flex-col leading-none">
                <span className="font-semibold text-lg">
                    {conversation.user.name}
                </span>
                <span className="font-medium text-gray-400 text-sm">
                    {conversation?.last_message}
                </span>
            </div>
        </div>
    );
}
