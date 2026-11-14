import type { ReactNode } from "react";

function SkeletonBlock({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse rounded-md bg-gray-200 ${className}`}
    />
  );
}

export function AdminPageSkeleton() {
  return (
    <div
      role="status"
      aria-label="Loading dashboard"
      className="flex min-h-dvh bg-gray-50"
    >
      <aside className="hidden w-64 shrink-0 border-r border-gray-200 bg-white p-5 md:block">
        <SkeletonBlock className="mb-10 h-10 w-40" />
        <div className="space-y-4">
          {Array.from({ length: 7 }, (_, index) => (
            <SkeletonBlock key={index} className="h-10 w-full" />
          ))}
        </div>
      </aside>
      <div className="min-w-0 flex-1">
        <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
          <SkeletonBlock className="h-5 w-32" />
          <SkeletonBlock className="h-9 w-28" />
        </header>
        <main className="space-y-8 p-6 md:p-8">
          <SkeletonBlock className="h-9 w-64 max-w-full" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }, (_, index) => (
              <SkeletonBlock key={index} className="h-28" />
            ))}
          </div>
          <div className="grid gap-8 xl:grid-cols-3">
            <SkeletonBlock className="h-80 xl:col-span-2" />
            <SkeletonBlock className="h-80" />
          </div>
        </main>
        <span className="sr-only">Loading…</span>
      </div>
    </div>
  );
}

export function ContentSkeleton({ children }: { children?: ReactNode }) {
  return (
    <div
      role="status"
      aria-label="Loading content"
      className="space-y-4 p-6 md:p-8"
    >
      {children ?? (
        <>
          <SkeletonBlock className="h-8 w-56 max-w-full" />
          <SkeletonBlock className="h-56 w-full" />
          <SkeletonBlock className="h-20 w-full" />
        </>
      )}
      <span className="sr-only">Loading…</span>
    </div>
  );
}
