import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

type TData =
{
    items:
    {
        id: string,
        name: string,
        ki: string,
        image: string
    }[]
}

const PageServerFetch : React.FC = async () =>
{
    const Response = await fetch("https://dragonball-api.com/api/characters?limit=100");
    const Characters : TData = await Response.json();
    return (
        <>
            <h1 className="my-4 text-center text-2xl font-bold">Requisições com Fetch Server-side</h1>
            <Suspense fallback={<p className="text-xl">Carregando resultados...</p>}>
                <div className="flex flex-wrap justify-center items-center gap-4">{
                    Characters.items.map((item) =>
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
                                <Link
                                    href={"/character/" + item.id}
                                    className="p-2 bg-green-300 hover:bg-green-500 rounded-lg min-w-20 text-center border border-green-500 border-solid"
                                >
                                    Ver Mais
                                </Link>
                            </div>
                        )
                    })
                }</div>
            </Suspense>
        </>
    )
}

export default PageServerFetch;