import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { MdOutlineKeyboardVoice } from "react-icons/md";
import { BsEmojiSmile } from "react-icons/bs";
import { HiOutlinePaperClip, HiPaperAirplane } from "react-icons/hi";
import { useEffect, useState } from "react";
import { DateTime } from "luxon";

export default function Chat({ auth, messages, conversation }) {

    // const [messages, setMessages] = useState([]);
    const [newMessages, setNewMessages] = useState(messages);
    const [message, setMessage] = useState("");

    useEffect(() => {
        window.Echo.private(`chat.${conversation.id}`).listen(
            "MessageSent",
            (event) => {
                console.log(event);
                setNewMessages((prev) => [...prev, event.message]);
            }
        );
    },[]);

    const sendMessage = async (e) => {
        e.preventDefault();

        const data = {
            userId: auth?.user?.id,
            conversationId: conversation?.id,
            message: message,
        };

        // const res = await axios.post(route("chat.store"), data);
        // if (res.status) {
        //     const res = await axios.get(
        //         route("support.show", conversation?.id)
        //     );
        // }

        window.Echo.connector.pusher.send_event(
            "SendMessage",
            JSON.stringify({
                message: message,
                userId: auth.user.id,
            }),
            "chat." + auth.user.id
        );
        setMessage("");
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Chat With Support
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl flex justify-center sm:px-6 lg:px-8">
                    <div className="flex flex-col gap-3 relative h-[70vh] max-w-lg w-full bg-white border border-gray-100 rounded-md py-4 px-6">
                        <div className="w-full space-y-10 relative min-h-full pb-32">
                            <div className="flex flex-col gap-3 overflow-y-auto h-[100%] rounded-md">
                                {/* <div className="relative flex flex-col bg-green-50 p-3 px-4 w-2/3 text-sm rounded-md pb-8">
                                    <span className="">
                                        Hi Jake, welcome to Easiffy. Hope you
                                        have fun with us
                                    </span>
                                    <span className="absolute text-[10px] right-4 bottom-2 ">
                                        11:00am
                                    </span>
                                </div>
                                <div className="relative self-end flex flex-col bg-slate-700 text-white p-3 px-4 w-2/3 text-sm rounded-md pb-8">
                                    <span className="">
                                        Thanks for your message, can i ask how i
                                        can get started on this platform?
                                    </span>
                                    <span className="absolute text-[10px] right-4 bottom-2 ">
                                        11:00am
                                    </span>
                                </div> */}
                                {newMessages.map((message, key) => (
                                    <div
                                        key={key}
                                        className={`${
                                            message.user_id == auth.user.id
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
                            </div>

                            <form
                                onSubmit={sendMessage}
                                className="border rounded-xl p-3 divide-y absolute bottom-0 w-full bg-white"
                            >
                                <div>
                                    <textarea
                                        type="text"
                                        name="message"
                                        value={message}
                                        onChange={(e) => {
                                            setMessage(e.target.value);
                                        }}
                                        className="w-full min-h-6 outline-none text-sm mb-2"
                                    ></textarea>
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
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
