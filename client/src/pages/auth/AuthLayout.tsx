import React from "react";

type Props = {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
};

export default function AuthLayout({ title, icon, children }: Props) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 p-4">
      <div className="fixed inset-0 -z-10" aria-hidden="true">
        <div className="animate-blob absolute -left-4 top-0 h-72 w-72 rounded-full bg-purple-300 opacity-20 mix-blend-multiply blur-xl filter" />
        <div className="animate-blob animation-delay-2000 absolute -right-4 top-0 h-72 w-72 rounded-full bg-blue-300 opacity-20 mix-blend-multiply blur-xl filter" />
        <div className="animate-blob animation-delay-4000 absolute -bottom-8 left-20 h-72 w-72 rounded-full bg-pink-300 opacity-20 mix-blend-multiply blur-xl filter" />
      </div>

      <section className="w-full max-w-md">
        <header className="mb-8 text-center">
          <div
            className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"
            aria-hidden="true"
          >
            {icon}
          </div>
          <h1 className="mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-3xl font-bold text-transparent">
            {title}
          </h1>
        </header>
        <div className="rounded-2xl bg-white/80 shadow-xl backdrop-blur-lg">
          {children}
        </div>
      </section>
    </div>
  );
}
