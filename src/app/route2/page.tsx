"use client"
import Image from "next/image";
import React, {Suspense, useEffect, useState} from "react";
import { Api } from "@/constants/api";

interface IData
{
    id: string,
    name: string,
    ki: string,
    image: string
}

const PageAxios : React.FC = () =>
{
    const [Characters, SetCharacters] = useState<IData[]>([]);
    const [FilterType, SetFilterType] = useState<string>("page");
    const [Filter, SetFilter] = useState<string>("");

    useEffect(()=>
    {
        const Load = async() =>
        {
            if(FilterType === "page")
            {
                Api.get(`/characters?page=${Filter}`).then((Response) =>
                {
                    SetCharacters(Response.data.items);
                }).catch((err) =>
                {
                    console.log(err);
                    SetCharacters([]);
                })
            }else
            {
                Api.get(`/characters?${FilterType}=${Filter}`).then((Response) =>
                {
                    SetCharacters(Response.data);
                }).catch((err) =>
                {
                    console.log(err);
                    SetCharacters([]);
                })
            }
        }
        Load();
    }, [Filter, FilterType]);

    return (
        <div className="flex flex-col items-center">
            <h1 className="my-4 text-center text-2xl font-bold">Requisições com Axios Client-side</h1>
            <p className="text-lg">Escreva um filtro e selecione o tipo</p>
            <div className="my-4 border-black border-2 border-solid divide-black divide-x-2">
                <select 
                    onChange={(e) => {SetFilterType(e.target.value)}} defaultValue={"page"}
                    className="p-2"
                >
                    <option value={"page"}>Página</option>
                    <option value={"name"}>Nome</option>
                    <option value={"race"}>Raça</option>
                    <option value={"gender"}>Sexo</option>
                    <option value={"affiliation"}>Afiliação</option>
                </select>
                <input
                    type="text" placeholder="Filtro" onChange={(e) => {SetFilter(e.target.value)}}
                    className="p-2"
                />
            </div>
            <Suspense fallback={<p className="text-xl">Carregando resultados...</p>}>
            <div className="flex flex-wrap justify-center items-center gap-4 w-3/4 my-4">{
                Characters.length ? 
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
                }) : <p className="text-xl">Nenhum personagem foi encontrado</p>
            }</div>
            </Suspense>
        </div>
    )
}

export default PageAxios;