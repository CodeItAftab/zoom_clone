"use client";

import { useGetCalls } from "@/hooks/useGetCall";
import { BellDot } from "lucide-react";
import React from "react";

const UpcomingMeetingTime = () => {
  const { getFirstUpcomingCallTime } = useGetCalls();

  const time = getFirstUpcomingCallTime();

  return (
    <h2 className="glassmorphism max-w-[270px] rounded py-2 text-center text-base font-normal flex gap-2 items-center px-3 ">
      <BellDot size={18} />
      {time && `Upcoming Meeting at: ${time}`}
      {!time && "No upcoming meetings"}
    </h2>
  );
};

export default UpcomingMeetingTime;
