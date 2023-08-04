
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/(frontend)/lib/prismadb";
import bcryptjs from 'bcrypt'

export async function POST(request:NextRequest) {
    try {
        const User = prisma.user
        const requestBody = await request.json(); 
        const{name, email, phone, password} = requestBody


      
       // Check if user already exists
    const userWithEmail = await User.findUnique({ where: { email } });
    if (userWithEmail) {
      return NextResponse.json({ error: "User already exists" },{ status: 400 });
    }

        //creating hashed pasword
          const salt = await bcryptjs.genSalt(10);
          const hashedPass = await bcryptjs.hash(password, salt) ;
      
        // Create a new user without hashed password first
        const saveUser = await User.create({
           data: {
                name,
                email,
                phone,
                password: hashedPass,      
            },
        });

        
          return NextResponse.json({
            message: "User created successfully",
            success: true,
            saveUser
        })
    
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})

    }
}