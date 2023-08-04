
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prismadb";



export async function POST(request: NextRequest){

    try {
        const reqBody = await request.json()
        const {token} = reqBody
    
       const user = await prisma.user.findFirst({
        where: {
        verifyToken: token,
        verifyTokenExpiry: {
          gt: new Date(), // Using 'new Date()' to get the current date and time
        },
      },
    });

  if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    // Update the user record to mark it as verified and remove the token and expiry
    await prisma.user.update({
      where: { id: user.id },
      data: {
        email_verified: true,
        verifyToken: null, // Set to null to remove the value
        verifyTokenExpiry: null, // Set to null to remove the value
      },
    });
        
        return NextResponse.json({
            message: "Email verified successfully",
            success: true
        })


    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }

}