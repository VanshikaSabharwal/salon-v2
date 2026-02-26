import Image from "next/image";
import events from "@/data/events.json";

interface Event {

 id:number;
 title:string;
 description:string;
 date:string;
 image:string;

}

export default function EventsPage(){

 const eventList = events as Event[];

 return(

 <div className="bg-[#f8f1e7] min-h-screen px-6 py-16">

  <div className="max-w-6xl mx-auto">

   <h1 className="text-4xl font-semibold text-center text-[#3f3a6e]">

    Our Events

   </h1>

   <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mt-12">

   {eventList.map((event)=>(

    <div
      key={event.id}
      className="bg-white rounded-xl shadow-lg overflow-hidden"
    >

      <Image
        src={event.image}
        alt={event.title}
        width={500}
        height={300}
        className="w-full h-60 object-cover"
      />

      <div className="p-6">

        <p className="text-pink-500 font-semibold">

         {event.date}

        </p>

        <h3 className="font-semibold text-black text-xl mt-2">

         {event.title}

        </h3>

        <p className="text-gray-600 mt-3">

         {event.description}

        </p>

      </div>

    </div>

   ))}

   </div>

  </div>

 </div>

 );

}