"use client";
import React from "react";

const CurrentDateTime = () => {
  const [dateTime, setDateTime] = React.useState(new Date());

  React.useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-4xl  font-extrabold lg:text-7xl">
        {dateTime.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })}
      </h1>
      <p className="text-lg font-medium text-sky-1 lg:text-2xl">
        {new Intl.DateTimeFormat("en-US", {
          dateStyle: "full",
        }).format(dateTime)}
      </p>
    </div>
  );
};

export default CurrentDateTime;
