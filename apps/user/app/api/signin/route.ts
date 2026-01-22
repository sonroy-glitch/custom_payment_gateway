import { NextRequest, NextResponse } from 'next/server';
import axios from "axios"
import jwt,{JwtPayload} from "jsonwebtoken"
import {cookies} from "next/headers"
import {z} from "zod"
const jwtSecret='sr1435'
import {PrismaClient} from "@prisma/client"
const prisma= new PrismaClient();
export async function POST(req:NextRequest){
    const schema = z.object({
        email:z.string().email(),
        passcode:z.string()
    })
    const body=await req.json();
    var check = schema.safeParse(body)
    
    if(check.success){
      var data= await prisma.wallet.findFirst({
        where:{email:body.email}
      })
      if(data ){
        if( data.passcode==body.passcode){
        var cookie =await cookies();
        var token_cookie= cookie.get('token')
        if(token_cookie){
            return NextResponse.json({msg:"Signin Success."},{status:200})

        }
        else{
            var token = jwt.sign({email:body.email,id:data.id},jwtSecret) as JwtPayload;
            cookie.set('token',token);
            return NextResponse.json({msg:"Signin Success."},{status:200,
                headers:{
                    "token":token
                }
            })

        }
        }
        else{
            return NextResponse.json({msg:"Wrong Password"},{status:202}) 
        }
      }
      else{
        return NextResponse.json({msg:"User not signedup."},{status:202})
      }
    }
    else{
        return NextResponse.json({
            msg:"invalid schema "
        },{status:202})
    }
}