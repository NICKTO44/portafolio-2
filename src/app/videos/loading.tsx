// src/app/videos/loading.tsx

export default function Loading() {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border border-beige/20 border-t-beige/70" />
          <p className="font-sans text-[10px] uppercase tracking-widest2 text-muted">
            Lumière
          </p>
        </div>
      </div>
    )
  }
  