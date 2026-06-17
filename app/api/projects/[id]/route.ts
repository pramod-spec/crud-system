import { prisma } from "@/lib/prisma";

import { NextResponse } from "next/server";

export async function PUT(req:Request, {params}:{params : Promise<{id :string}>}) {
    try{
        const body = await req.json()

        const {id} = await params;

        const project = await prisma.project.update({
            where:{id},
            data :{ task : body.task}
        })

        return NextResponse.json(project)
    }catch(error){
    
        return NextResponse.json(
            {message : "Error While Updating"},
            {status:500}
        )
    }
    
}


export async function DELETE(req:Request, {params}:{params: Promise<{id:string}>}) {
    try{
        


        
        const {id} = await params
        await prisma.project.delete({
            where:{id},
            
            
        })

        return NextResponse.json(
            {message :"Task Deleted Successfully"}
        )
    }catch(error){
        return NextResponse.json(
            {message:"Errror While Deleting the Task"},
            {status:500}
        )
    }
    
}