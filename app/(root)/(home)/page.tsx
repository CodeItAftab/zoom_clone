import CurrentDateTime from "@/components/CurrentDateTime";
import MeetingTypeList from "@/components/MeetingTypeList";
import UpcomingMeetingTime from "@/components/UpcomingMeetingTime";
import React from "react";

function Home() {
  // const now = new Date();

  // const time = now.toLocaleTimeString("en-US", {
  //   hour: "2-digit",
  //   minute: "2-digit",
  //   hour12: true,
  // });
  // const date = new Intl.DateTimeFormat("en-US", {
  //   dateStyle: "full",
  // }).format(now);

  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <div className="h-[300px] w-full rounded-[20px] bg-hero bg-cover  ">
        <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
          <UpcomingMeetingTime />
          <CurrentDateTime />
        </div>
      </div>
      <MeetingTypeList />
    </section>
  );
}

export default Home;
