"use client";

import { useEffect, useState } from "react";
import {
  ChessRook,
  ChessBishop,
  ChessKnight,
  ChessKing,
  ChessPawn,
  ChessQueen,
  TicketCheck,
  Ticket,
  BookOpen,
  User,
} from "lucide-react";

function page() {
  return (
    <main className="min-h-screen bg-[#101116] text-white">
      <header className="fixed left-0 right-0 top-0 z-50 flex h-[61px] items-center justify-between border border-[#30303a] bg-[#191a22] px-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-400">
            <ChessRook size={19} />
          </div>

          <span className="text-[15px] font-extrabold">Skak Systems</span>
        </div>
      </header>

      <aside className="fixed bottom-0 left-0 top-[61px] z-40 w-[260px] border-r border-[#252630] bg-[#191a22] px-2 py-3 max-md:w-[65px]">
        <p className="mb-3 px-1 text-[11px] text-[#9297aa] max-md:text-center">
          MENU
        </p>

        <nav className="space-y-2">
          <a
            href="#"
            className={`text-lg flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-left  "bg-[#342653]  text-white max-md:justify-center max-md:px-1`}
          >
            <ChessPawn size={15} className="text-blue-400" /> hallo Pawn
          </a>
          <a
            href="#"
            className={`text-lg flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-left "bg-[#342653] text-white max-md:justify-center max-md:px-1`}
          >
            <ChessRook size={15} className="text-blue-400" /> hallo Rook
          </a>
          <a
            href="#"
            className={`text-lg flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-left "bg-[#342653] text-white max-md:justify-center max-md:px-1`}
          >
            <ChessKnight size={15} className="text-blue-400" /> hallo Knight
          </a>
          <a
            href="#"
            className={`text-lg flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-left "bg-[#342653]  text-white max-md:justify-center max-md:px-1`}
          >
            <ChessBishop size={15} className="text-blue-400" /> hallo Bishop
          </a>
          <a
            href="#"
            className={`text-lg flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-left "bg-[#342653] text-white max-md:justify-center max-md:px-1`}
          >
            <ChessQueen size={15} className="text-blue-400" /> hallo Queen
          </a>
          <a
            href="#"
            className={`text-lg flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-left "bg-[#342653] text-white max-md:justify-center max-md:px-1`}
          >
            <ChessKing size={15} className="text-blue-400" /> hallo King
          </a>
        </nav>
      </aside>
      <div className="ml-[260px] px-6 pb-10 pt-[77px] max-md:ml-[65px] max-md:px-4">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          </div>
        </div>

        <div className="mb-6 h-px w-full bg-blue-400/70 " />

        <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
          <div className="group rounded-2xl border border-[#30303a] bg-[#252735] p-5 shadow-lg shadow-black/10 ">
            <div className="mb-8 flex items-start justify-between">
              <div>
                <p className="text-md font-medium text-[#c5c8d4]">Tickets</p>
              </div>
              <div className="rounded-xl bg-blue-400/10 p-3 text-blue-400  ">
                <Ticket size={21} />
              </div>
            </div>
            <p className="text-3xl font-bold tracking-tight">15</p>
          </div>

          <div className="group rounded-2xl border border-[#30303a] bg-[#252735] p-5 shadow-lg shadow-black/10">
            <div className="mb-8 flex items-start justify-between">
              <div>
                <p className="text-md font-medium text-[#c5c8d4]">
                  Closed Tickets
                </p>
              </div>
              <div className="rounded-xl bg-emerald-400/10 p-3 ">
                <TicketCheck size={21} />
              </div>
            </div>
            <p className="text-3xl font-bold tracking-tight">100</p>
          </div>

          <div className="group rounded-2xl border border-[#30303a] bg-[#252735] p-5 shadow-lg shadow-black/10">
            <div className="mb-8 flex items-start justify-between">
              <div>
                <p className="text-md font-medium text-[#c5c8d4]">
                  Open Tickets
                </p>
              </div>
              <div className="rounded-xl bg-amber-400/10 p-3 ">
                <BookOpen size={21} />
              </div>
            </div>
            <p className="text-3xl font-bold tracking-tight">1</p>
          </div>

          <div className="group rounded-2xl border border-[#30303a] bg-[#252735] p-5 shadow-lg shadow-black/10 ">
            <div className="mb-8 flex items-start justify-between">
              <div>
                <p className="text-md font-medium text-[#c5c8d4]">Employees</p>
              </div>
              <div className="rounded-xl bg-blue-600/10 p-3 text-blue-500">
                <User size={21} />
              </div>
            </div>
            <p className="text-3xl font-bold tracking-tight">30</p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default page;
//It needs to be perfect. "Benjamin"
