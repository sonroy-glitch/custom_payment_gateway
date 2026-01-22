import cors from 'cors'

export function middleware(){
    cors();
}

export const config={ matcher:"/api/:path*" }