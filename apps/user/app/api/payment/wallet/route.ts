import {NextRequest,NextResponse} from "next/server"
import jwt,{JwtPayload} from "jsonwebtoken"
import {z} from 'zod'
import {PrismaClient} from "@prisma/client"
import {cookies } from "next/headers"
const prisma=new PrismaClient()
const jwtSecret='sr1435'
export async function POST(req:NextRequest){
    const schema =z.object({
        walletId:z.number(),
        passcode:z.string(),
        senderEmail:z.string()
    })
    const body= await req.json();
    const check = schema.safeParse(body);
    if(check.success){
        const user = await prisma.user.findFirst({
            where:{email:body.senderEmail}
        })
        if(user){
            if(user.passcode==body.passcode){
                
                const token = jwt.sign({
                    walletId:body.walletId,
                    passcode:body.passcode,
                    senderEmail:body.senderEmail
                },jwtSecret);
                return NextResponse.json({token:token},{status:200})

            }
            else{
                return NextResponse.json({msg:"Wrong Passcode"},{status:202})
            }
        }
       
    }
}