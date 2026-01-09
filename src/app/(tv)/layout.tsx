
export default function TVLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="w-screen h-[100dvh] overflow-hidden bg-black touch-none">
            {children}
        </main>
    );
}
