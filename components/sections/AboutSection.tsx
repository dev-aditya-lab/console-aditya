import { cn } from "@/lib/utils";
import React from "react";
import  Image  from 'next/image';

export function AboutSection() {
  return (
    <div className="relative  h-[50rem] w-full   bg-white dark:bg-black">
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
          "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]",
        )}
      />
      <div className="mx-auto w-full flex items-center justify-center">
        <div id="about" className="md:w-4xl px-5 md:px-0 z-10 py-5">
        <h1 className="text-center font-bold py-10 uppercase text-2xl text-zinc-600 underline underline-offset-2 md:text-4xl">About Me</h1>
        <div className="flex md:flex-row flex-col gap-8">
            <div className="bg-red-500 md:h-60 md:w-60 rounded-2xl border-2 border-zinc-600 overflow-hidden">
        
                      <Image
                        src="/logo.jpg"
                        alt="logo"
                        width={5000}
                        height={5000}
                        className="rounded-md w-full h-full object-cover"
                      />
            </div>
            <div className="md:flex md:flex-col md:justify-end gap-5">
                <h1 className="text-center md:text-left font-bold uppercase text-2xl text-zinc-300  md:text-5xl">Aditya Kumar Gutpa</h1>
                <p className="text-center md:text-left text-zinc-500  text-sm md:text-lg">Currently in dev mode: College × Hackathons × Learning</p>
                <h1>Aditya Kumar Gupa</h1>
            </div>
            </div>
        </div>
        </div>
    </div>
  );
}
