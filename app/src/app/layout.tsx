import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Podcast search engine",
  description: "Runs on Chroma + Nextjs",
};

const bg = {
  backgroundImage: "radial-gradient(#444cf7 0.5px, #cccccc 0.5px)",
  backgroundSize: "10px 10px",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="h-full" lang="en">
      <body style={bg} className={`${inter.className} h-full`}>
        <div className="min-h-full mx-auto max-w-3xl bg-gray-100">
          <div className="p-4 text-sm">
            <center>
              120+ episodes of{" "}
              <a
                className="font-bold"
                href="https://www.youtube.com/@MyFirstMillionPod"
              >
                My First Million
              </a>{" "}
              Source:{" "}
              <a
                className="font-bold"
                href="https://github.com/bakery/podcastsearch"
              >
                Github
              </a>{" "}
              Powered by{" "}
              <a className="font-bold" href="https://www.trychroma.com/">
                Chroma
              </a>
              {" and "}
              <a className="font-bold" href="https://nextjs.org/">
                Nextjs
              </a>
            </center>
          </div>
          <div
            style={{ backgroundImage: "url(/channel_bg.jpeg)" }}
            className="bg-center pb-64"
          />
          {children}
        </div>
      </body>
    </html>
  );
}
