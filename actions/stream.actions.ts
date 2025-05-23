"use server"
import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret = process.env.STREAM_SECRET_KEY;

export const tokenProvider = async () =>{
    const user = await currentUser();

    if(!user) throw new Error("User is not authenticated");
    if(!apiKey) throw new Error("No Stream API key found");
    if(!apiSecret) throw new Error("No Stream API secret found");

    const client = new StreamClient(apiKey, apiSecret);

    const exp = Math.round(new Date().getTime()/1000) + 60 * 60  // 1 hour

    const issued = Math.floor(Date.now() / 1000) - 60 // 1 minute;

    const token  = client.generateUserToken({user_id:user.id,exp,iat:issued});

    return token;;

}