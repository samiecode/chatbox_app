<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Chat With Support') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="flex flex-col gap-3 relative min-h-[300px] max-w-lg w-full bg-white border border-gray-100 rounded-md p-10">
				<div class="w-full space-y-10">
					<div class="flex flex-col gap-3">
						<div class="relative flex flex-col bg-green-50 p-3 px-4 w-2/3 text-sm rounded-md pb-8">
							<span class="">
								Hi Jake, welcome to Easiffy. Hope you have fun
								with us
							</span>
							<span class="absolute text-[10px] right-4 bottom-2 ">
								11:00am
							</span>
						</div>
						<div class="relative self-end flex flex-col bg-slate-700 text-white p-3 px-4 w-2/3 text-sm rounded-md pb-8">
							<span class="">
								Thanks for your message, can i ask how i can get
								started on this platform?
							</span>
							<span class="absolute text-[10px] right-4 bottom-2 ">
								11:00am
							</span>
						</div>
					</div>

					<form class="border rounded-xl p-3 divide-y">
						<div>
							<input
								type="text"
								name="message"
								class="w-full outline-none text-sm mb-2"
							/>
						</div>
						<div class="pt-2 flex justify-between">
							<div class="flex items-center *:p-2 divide-x">
								<span>
									<HiOutlinePaperClip class="text-md" />
								</span>
								<span>
									<MdOutlineKeyboardVoice class="text-md" />
								</span>
								<span>
									<BsEmojiSmile class="text-md" />
								</span>
							</div>
							<button
								type="submit"
								class="rounded-md bg-green-600 w-8 h-8 flex items-center justify-center"
							>
								<HiPaperAirplane class="rotate-90 text-white text-md" />
							</button>
						</div>
					</form>
				</div>
			</div>
        </div>
    </div>
</x-app-layout>
