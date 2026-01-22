import {NextRequest,NextResponse} from "next/server"
import jwt,{JwtPayload} from "jsonwebtoken"
//returns a token with the senderId and receiverPhone and passcode encoded
const jwtSecret = 'sr1435'
import {cookies} from "next/headers"
import {z} from 'zod'
import {PrismaClient} from "@prisma/client"
const prisma = new PrismaClient()
export async function POST(req:NextRequest){
const schema=z.object({
    phone:z.string(),
    passcode:z.string(),
    senderEmail:z.string()
})
const body= await req.json()
const check = schema.safeParse(body)

var data =await prisma.wallet.findFirst({
    where:{email:body.senderEmail}
})


if(check.success && data){
if(body.passcode==data.passcode){
    try {
        let token= jwt.sign({
            senderEmail:body.senderEmail,
            receiverPhone:body.phone,
            passcode:body.passcode
        },jwtSecret)
        return NextResponse.json({token:token},{status:200})
    } catch (error) {
        return NextResponse.json({error:error},{status:202})
        
    }
    
}
return NextResponse.json({msg:'Wrong Passcode'},{status:202})
}
return NextResponse.json({msg:'Wrong Schema Type'},{status:202})

}