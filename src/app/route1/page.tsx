"use client"
import Image from "next/image";
import React, {useEffect, useState} from "react";

interface IData
{
    id: string,
    name: string,
    ki: string,
    image: string
}

const PageFetch : React.FC = () =>
{
    const [Characters, SetCharacters] = useState<IData[]>([]);

    useEffect(()=>
    {
        const Load = async() =>
        {
            const Response = await fetch("https://dragonball-api.com/api/characters");
            const Data = await Response.json();
            SetCharacters(Data.items);
            console.log(Data.items);
        }
        Load();
    }, []);

    return (
        <>
            <h1 className="my-4 text-center text-2xl font-bold">Requisições com Fetch Client-side</h1>
            <div className="flex flex-wrap justify-center items-center gap-4">{
                Characters.map((item) =>
                {
                    return(
                        <div key={item.id} className="flex flex-col justify-center items-center border-black border-2 border-solid w-64 h-96 bg-slate-100">
                            <Image 
                                src={item.image} alt={item.name} width={1000} height={1000}
                                className="h-3/5 w-auto object-contain"
                            />
                            <hr className="w-full"/>
                            <p className="text-xl">{item.name}</p>
                            <p className="text-lg">Ki: {item.ki}</p>
                        </div>
                    )
                })
            }</div>
        </>
    )
}

export default PageFetch;