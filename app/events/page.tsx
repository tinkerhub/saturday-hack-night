import { validateRequest } from "@/utils/lucia";
import { CurrentEvent } from "./ui/CurrentEvent";
import { getCurrentEvent } from "@/utils/events";

const EventsPage = async () => {
	const { user } = await validateRequest();

	const currentEvent = await getCurrentEvent(user);

	console.log(currentEvent);

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
		</div>
	);
};

export default EventsPage;
