import SupportUser from "@/Components/SupportUser";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { MdOutlineKeyboardVoice } from "react-icons/md";
import { BsEmojiSmile } from "react-icons/bs";
import { HiOutlinePaperClip, HiPaperAirplane } from "react-icons/hi";
import { useEffect, useState } from "react";
import Echo from "laravel-echo";

export default function Support({ auth, conversations, messages }) {
    
    conversations = JSON.parse(conversations);
    const [message, setMessage] = useState('');

    const sendMessage = (e) => {
        e.preventDefault();

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
                    Support
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex gap-10">
                        <div className="min-h-[80vh] basis-[30%] bg-white rounded-xl p-3">
                            {conversations.map((conversation, key) => (
                                <SupportUser
                                    conversation={conversation}
                                    key={key}
                                />
                            ))}
                        </div>
                        <div className="flex flex-col gap-3 relative min-h-[300px]  basis-[70%] bg-white border border-gray-100 rounded-md p-10">
                            <div className="w-full space-y-10 relative min-h-full">
                                <div className="flex flex-col gap-3">
                                    <div className="relative flex flex-col bg-green-50 p-3 px-4 w-2/3 text-sm rounded-md pb-8">
                                        <span className="">
                                            Hi Jake, welcome to Easiffy. Hope
                                            you have fun with us
                                        </span>
                                        <span className="absolute text-[10px] right-4 bottom-2 ">
                                            11:00am
                                        </span>
                                    </div>
                                    <div className="relative self-end flex flex-col bg-slate-700 text-white p-3 px-4 w-2/3 text-sm rounded-md pb-8">
                                        <span className="">
                                            Thanks for your message, can i ask
                                            how i can get started on this
                                            platform?
                                        </span>
                                        <span className="absolute text-[10px] right-4 bottom-2 ">
                                            11:00am
                                        </span>
                                    </div>
                                </div>

                                <form
                                    onSubmit={sendMessage}
                                    className="absolute bottom-0 border w-full rounded-xl p-3 divide-y"
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
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
