"use client";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

export const useGetCalls = () => {
  const [calls, setCalls] = useState<Call[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const client = useStreamVideoClient();

  const { user } = useUser();

  useEffect(() => {
    const loadCalls = async () => {
      if (!client || !user) return;

      setIsLoading(true);
      try {
        const { calls } = await client.queryCalls({
          sort: [{ field: "starts_at", direction: -1 }],
          filter_conditions: {
            starts_at: {
              $exists: true,
            },
            $or: [
              { created_by_user_id: user.id },
              { members: { $in: [user.id] } },
            ],
          },
        });

        setCalls(calls);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCalls();
  }, [client, user]);

  const now = new Date();

  const endedCalls = calls.filter(({ state: { startsAt, endedAt } }: Call) => {
    return (startsAt && new Date(startsAt) < now) || !!endedAt;
  });

  const upcomingCalls = calls.filter(({ state: { startsAt } }: Call) => {
    return startsAt && new Date(startsAt) > now;
  });

  const getFirstUpcomingCallTime = () => {
    const firstUpcomingCall = upcomingCalls[0] as Call;
    if (!firstUpcomingCall) return null;
    const startsAt = firstUpcomingCall.state.startsAt
      ? new Date(firstUpcomingCall.state.startsAt)
      : undefined;
    const formattedDate = startsAt
      ? startsAt.toLocaleString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : undefined;
    return {
      startsAt: formattedDate,
    };
  };

  return {
    endedCalls,
    upcomingCalls,
    callRecordings: calls,
    isLoading,
    getFirstUpcomingCallTime,
  };
};
