import SupportUser from "@/Components/SupportUser";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { MdOutlineKeyboardVoice } from "react-icons/md";
import { BsEmojiSmile } from "react-icons/bs";
import { HiOutlinePaperClip, HiPaperAirplane } from "react-icons/hi";
import { useEffect, useState } from "react";
import { DateTime } from "luxon";

export default function Support({ auth, conversations }) {
    const [newConversations, setNewConversations] = useState(
        JSON.parse(conversations)
    );
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState(null);
    const [currentConversation, setCurrentConversation] = useState(null);

    useEffect(() => {
        if (!!currentConversation) {
            window.Echo.private(`chat.${currentConversation?.id}`).listen(
                "MessageSent",
                (event) => {
                    console.log(event);
                    setMessages((prevMessages) => [
                        ...prevMessages,
                        event.message,
                    ]);
                }
            );
        }

        window.Echo.private("message.admin").listen(
            "MessageSentAdmin",
            (event) => {
                console.log(event);
                let conversationExists = false;

                for (var i = 0; i < newConversations.length; i++) {
                    if (newConversations[i].id === event.conversation.id) {
                        const newConversationsCopy = [...newConversations];
                        newConversationsCopy[i] = event.conversation;
                        setNewConversations(newConversationsCopy);
                        conversationExists = true;
                    }
                }
                console.log(conversationExists);

                if (!conversationExists) {
                    setNewConversations((prev) => [
                        ...prev,
                        event.conversation,
                    ]);
                }
            }
        );
    }, [currentConversation]);

    const sendMessage = async (e) => {
        e.preventDefault();

        const data = {
            userId: auth?.user?.id,
            conversationId: currentConversation?.id,
            message: message,
        };

        const res = await axios.post(route("chat.store"), data);
        if (res.status) {
            const res = await axios.get(
                route("support.show", currentConversation?.id)
            );
            if (res.status == 200) {
                setMessages(res.data);
            }
        }

        // window.Echo.connector.pusher.send_event(
        //     "SendMessage",
        //     JSON.stringify({
        //         message: message,
        //         userId: auth.user.id,
        //     }),
        //     "chat." + auth.user.id
        // );
        setMessage("");
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Support
                </h2>
            }
        >
            <Head title="Support" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto px-4 lg:px-6">
                    <div className="flex gap-4">
                        <div className="h-[80vh] w-[300px] bg-white rounded-xl p-2">
                            {newConversations.map((conversation, key) => (
                                <SupportUser
                                    conversation={conversation}
                                    setMessages={setMessages}
                                    setCurrentConversation={
                                        setCurrentConversation
                                    }
                                    key={key}
                                />
                            ))}
                        </div>
                        <div className="flex flex-col gap-3 relative h-[80vh] w-full bg-white border border-gray-100 rounded-md p-10">
                            {!!messages && (
                                <div className="w-full space-y-10 relative min-h-full pb-32">
                                    <div className="flex flex-col gap-3 overflow-y-auto h-[100%]">
                                        {messages.map((message, key) => (
                                            <div
                                                key={key}
                                                className={`${
                                                    message.user_id ==
                                                    auth.user.id
                                                        ? "self-end bg-slate-700 text-white "
                                                        : "bg-green-50"
                                                } relative flex flex-col p-3 px-4 w-2/3 text-sm rounded-md pb-8`}
                                            >
                                                <span className="">
                                                    {message.content}
                                                </span>
                                                <span className="absolute text-[10px] right-4 bottom-2 ">
                                                    {message.sent_at}
                                                </span>
                                            </div>
                                        ))}
                                        {/* <div className="relative self-end flex flex-col bg-slate-700 text-white p-3 px-4 w-2/3 text-sm rounded-md pb-8">
                                            <span className="">
                                                Thanks for your message, can i
                                                ask how i can get started on
                                                this platform?
                                            </span>
                                            <span className="absolute text-[10px] right-4 bottom-2 ">
                                                11:00am
                                            </span>
                                        </div> */}
                                    </div>

                                    <form
                                        onSubmit={sendMessage}
                                        className="absolute bottom-0 border w-full rounded-xl p-3 divide-y bg-white"
                                    >
                                        <div>
                                            <input
                                                type="text"
                                                name="message"
                                                value={message}
                                                onChange={(e) => {
                                                    setMessage(e.target.value);
                                                }}
                                                className="w-full outline-none text-sm mb-2"
                                            />
                                        </div>
                                        <div className="pt-2 flex justify-between">
                                            <div className="flex items-center *:p-2 divide-x">
                                                <span>
                                                    <HiOutlinePaperClip className="text-md" />
                                                </span>
                                                <span>
                                                    <MdOutlineKeyboardVoice className="text-md" />
                                                </span>
                                                <span>
                                                    <BsEmojiSmile className="text-md" />
                                                </span>
                                            </div>
                                            <button
                                                type="submit"
                                                className="rounded-md bg-green-600 w-8 h-8 flex items-center justify-center"
                                            >
                                                <HiPaperAirplane className="rotate-90 text-white text-md" />
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
