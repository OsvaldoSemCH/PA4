import Link from "next/link"
import { Routes } from "@/constants/routes"

export function Header()
{
    return(
        <header className="flex flex-row flex-wrap justify-center items-center bg-green-700 w-full min-h-16 gap-4">
            <Link href={Routes.Route1} className="p-2 bg-green-500 rounded-lg w-24 text-center">Fetch</Link>
            <Link href={Routes.Route2} className="p-2 bg-green-500 rounded-lg w-24 text-center">Axios</Link>
            <Link href={Routes.Route3} className="p-2 bg-green-500 rounded-lg w-24 text-center">Server-side</Link>
        </header>
    )
}