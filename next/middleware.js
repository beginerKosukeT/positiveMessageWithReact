import { NextResponse } from "next/server"
import { jwtVerify } from "jose"

export async function middleware(request) {
    const token = await request.headers.get("Authorization")?.split(" ")[1]
    
    if(!token){
        return NextResponse.json({message: "トークンがありません"})
    }

    try{
        const secretKey = new TextEncoder().encode("next-app") 
        const decodedJwt = await jwtVerify(token, secretKey)
        return NextResponse.next({message: "トークンを確認しました"})
    }catch(err){
        return NextResponse.json({message: "トークンが正しくないので、ログインしてください"})
    }
}

export const config = {
    matcher: ["/api/item/create", "/api/item/update/:path*", "/api/item/delete/:path*"],
}