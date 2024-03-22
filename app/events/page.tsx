import { validateRequest } from "@/utils/lucia";
import { CurrentEvent } from "./ui/CurrentEvent";
import { getCurrentEvent, getEvents } from "@/utils/events";
import { EventCard } from "./ui/EventCard";
import { CreateTeamModal } from "./ui/modal/CreateTeamModal";

type SearchParamProps = {
	searchParams: Record<string, string> | null | undefined;
};

const EventsPage = async ({ searchParams }: SearchParamProps) => {
	const registerModal = searchParams?.register === "true";
	const updateModal = searchParams?.update === "true";

	const { user } = await validateRequest();
	const currentEvent = await getCurrentEvent(user);
	const events = await getEvents();

	return (
		<div
			style={{
				backgroundImage: `linear-gradient(180deg, rgba(12, 15, 23, 0) 67.85%, #0C0F17 100%), 
                                 linear-gradient(180deg, #0C0F17 0%, rgba(12, 15, 23, 0.8) 100%),
                                 url('images/codeBg.png')`,
			}}
			className=" bg-cover bg-center bg-no-repeat"
		>
			{currentEvent.event && (
				<div className="w-full container mx-auto pt-24 lg:pt-18 px-4 md:px-0 flex flex-col items-start">
					<h1 className="text-4xl font-bold text-white py-4">
						Ongoing Events 🚀
					</h1>
					<CurrentEvent user={user} data={currentEvent} />
				</div>
			)}

			{user && currentEvent.event && !currentEvent.team && registerModal && (
				<CreateTeamModal
					user={user}
					isOpen={registerModal && !currentEvent.team && !!user}
					eventId={currentEvent.event.id}
				/>
			)}

			{events && events.length > 0 && (
				<div className="mt-8 w-full container  px-4 md:px-0 mx-auto flex flex-col items-center">
					<h1 className="text-4xl font-bold text-white w-full text-left">
						Explored Areas 🌟
					</h1>

					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-12 py-4 lg:py-9">
						{events.map((event) => (
							<EventCard key={event.id} event={event} />
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default EventsPage;
