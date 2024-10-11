import { Routes } from "@/constants/routes";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

interface CharacterData
{
    id: string
    name: string
    ki: string
    race: string
    gender: string
    image: string
    affiliation: string
}

interface CharacterParams
{
    params:
    {
        id: string
    }
}

interface CharacterDataSI
{
    items: CharacterData[]
}

const PageCharacter = async ({params: {id}} : CharacterParams) =>
{
    const Response = await fetch("https://dragonball-api.com/api/characters/" + id);
    const Character : CharacterData = await Response.json();
    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className="my-4 text-center text-2xl font-bold">Detalhes do Personagem</h1>
            <Suspense fallback={<p className="text-xl">Carregando resultados...</p>}>
                <div className="flex flex-col md:flex-row items-center border-black border-2 border-solid w-64 md:w-[40rem] h-fit bg-slate-100 p-4">
                    <Image 
                        src={Character.image} alt={Character.name} width={1000} height={1000}
                        className="w-[20rem] max-h-[30rem] object-contain"
                    />
                    <div className="flex flex-col justify-center items-start">
                        <p className="text-2xl font-bold">{Character.name}</p>
                        <p className="text-lg">{Character.race}</p>
                        <p className="text-lg">Gender: {Character.gender}</p>
                        <p className="text-lg">Ki: {Character.ki}</p>
                        <p className="text-lg">Affiliation: {Character.affiliation}</p>
                    </div>
                </div>
            </Suspense>
            <Link
                href={Routes.Route3}
                className="p-2 bg-green-300 hover:bg-green-500 rounded-lg min-w-20 mt-8 text-center border border-green-500 border-solid"
            >
                Voltar
            </Link>
        </div>
    )
}

export async function generateStaticParams()
{
    const Res = await fetch(`https://dragonball-api.com/api/characters?limit=100`);
    const Data : CharacterDataSI = await Res.json();
    return Data.items.map((item) => (item.id.toString()));
}

export default PageCharacter;