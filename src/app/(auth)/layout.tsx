import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#705446] via-[#705446] to-[#3C3431]">
      {/* Left Side - Form */}
      <div className="flex flex-1 items-center justify-center p-8">
        {children}
      </div>

      {/* Right Side - Branding */}
      <div className="flex hidden flex-1 items-center justify-center p-8 lg:flex">
        <div className="space-y-8 text-white">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
              <span className="text-lg font-bold text-teal-800">D</span>
            </div>
            <span className="text-2xl font-bold uppercase">Deenin Dunya</span>
          </div>

          <div className="space-y-4">
            <h2 className="text-4xl leading-tight font-bold lg:text-5xl">
              Stay Connected to Your Deen
            </h2>
            <p className="max-w-md text-lg leading-relaxed text-teal-100">
              Track prayers, follow Sunnah, read Qur’an, and access daily duas —
              all designed to support consistency without pressure.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex">
              <div className="-mr-3 flex h-12 w-12 items-center justify-center rounded-full border-2 border-teal-700 bg-teal-600 font-bold text-white">
                J
              </div>
              <div className="-mr-3 flex h-12 w-12 items-center justify-center rounded-full border-2 border-teal-700 bg-teal-500 font-bold text-white">
                S
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-teal-700 bg-teal-400 font-bold text-white">
                M
              </div>
            </div>
            <p className="text-teal-100">
              <span className="font-semibold text-white">5k+</span> people
              joined us, now it&apos;s your turn
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
