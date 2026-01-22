import {NextRequest,NextResponse} from "next/server"
import {cookies} from "next/headers"
import jwt,{JwtPayload} from "jsonwebtoken"
import {PrismaClient} from "@prisma/client"
const jwtSecret='sr1435'
const prisma= new PrismaClient();
export async function GET(req:NextRequest){
    const cookie= await cookies();
    let token=cookie.get('token')||'';
    
    try {
       if(token){ let verified = jwt.verify(token.value,jwtSecret);
        const data= await prisma.wallet.findFirst({
            where:{id:verified.id},
            select:{
                id:true,
                email:true,
                name:true,
                number:true,
                balance:true
            }
        })
    
        return NextResponse.json(data,{status:200})}
    } catch (error) {
        return NextResponse.json({msg:error.error},{status:202})
        
    }
    
}