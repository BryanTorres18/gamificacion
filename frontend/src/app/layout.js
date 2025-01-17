import "../styles/globals.css";
import Footer from "@/components/footer";

export const metadata = {
    title: "Gamificación",
    description: "Generated by create next app",
};

export default function RootLayout({ children }) {
    return (
        <html lang="es">
            <head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Gamificación</title>
            </head>
            <body className=
                      "text-gray-900 bg-base min-h-screen flex flex-col">
                <main className="container mx-auto py-8 flex-grow">
                        {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}

