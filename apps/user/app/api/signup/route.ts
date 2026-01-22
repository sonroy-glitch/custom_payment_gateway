import { NextRequest, NextResponse } from 'next/server';
import {cookies} from "next/headers"
import {z} from "zod"
import {PrismaClient} from "@prisma/client"
import jwt,{JwtPayload} from "jsonwebtoken"
const prisma= new PrismaClient();
const jwtSecret="sr1435"
export async function POST(req:NextRequest){
    try {
        const body= await req.json();
    const schema=z.object({
        name:z.string(),
        email:z.string().email(),
        phone:z.string().max(10).min(10),
        passcode:z.string()
    })
    const check= schema.safeParse(body);
    
    if(check.success){
        var data= await prisma.wallet.findFirst({
            where:{number:body.phone}
        })
        // console.log(data)
        if(data){
          return NextResponse.json({
            msg:"User already exists, Signin"
          },{
            status:202
          })
        }
        else{
            data=await prisma.wallet.create({
                data:{
                    name:body.name,
                    email:body.email,
                    number:body.phone,
                    passcode:body.passcode,
                    balance:0
                 }
                })
               let token = jwt.sign({
                  email:body.email,
                  id:data.id
               },jwtSecret) as JwtPayload ;
              const cookie= await cookies();
              cookie.set('token',token)
             return NextResponse.json({status:200,
                headers:{
                    "auth-cookie":token
                }
             })
              
        }
     

    }
    else{
        return NextResponse.json({msg:"Invalid Schema Type"},{status:202})
    }

    } catch (error) {
        return NextResponse.json({msg:'There is something wrong with the server'},{status:505})
        
    }
    
}