import { getDataFromToken } from "@/helpers/getDataFromToken";

import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request:NextRequest){

    try {
        console.log("GET", request);
        
        const userId = await getDataFromToken(request);
        console.log("userId", userId);
        
        const user = await User.findOne({_id: userId}).select("-password");
        console.log("user", user);
        
        return NextResponse.json({
            mesaaage: "User found",
            data: user
        })
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 400});
    } 

}