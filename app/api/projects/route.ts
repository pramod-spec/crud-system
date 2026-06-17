import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req:Request) {
    try{
        const body = await req.json()
        const project = await prisma.project.create({
            data :{task : body.task}
        })

        return NextResponse.json(project)
    }catch(error){
        return NextResponse.json(
            {message: "Error While Creating Task"},
            {status : 500}
        )
    }
    
    
    
}




export async function GET(req:Request) {
    try{
        const projects = await prisma.project.findMany()

        return NextResponse.json(projects)
    }catch(error){
        return NextResponse.json(
            {message :"Error While Geting The Task"},
            {status : 500}
        )
    }
    
}