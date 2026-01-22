import {cookies} from "next/headers"
import {NextRequest,NextResponse} from "next/server"
export  async function GET(req:NextRequest){
    try {
var cookieStore=await cookies();
        cookieStore.delete('token')
        return NextResponse.json({msg:"Token revoked"},{status:200})
    } catch (error) {
        return NextResponse.json({msg:error},{status:202})
        
    }

}