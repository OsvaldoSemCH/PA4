/** @type {import('next').NextConfig} */
const nextConfig =
{
    images:
    {
        remotePatterns:
        [
            {protocol: "https", hostname: "dragonball-api.com"}
        ]
    },
    rewrites: () =>
    {
        return [
            {
                source: "/",
                destination: "/route1",
            },
            {
                source: "/primeira-rota",
                destination: "/route1",
            },
            {
                source: "/segunda-rota",
                destination: "/route2",
            },
        ]
    }
};

export default nextConfig;
