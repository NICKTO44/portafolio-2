// Copia este archivo en cada carpeta de ruta:
// src/app/loading.tsx
// src/app/portfolio/loading.tsx
// src/app/services/loading.tsx
// src/app/about/loading.tsx
// src/app/blog/loading.tsx

export default function Loading() {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          {/* Spinner sutil acorde al diseño */}
          <div className="h-8 w-8 animate-spin rounded-full border border-beige/20 border-t-beige/70" />
          <p className="font-sans text-[10px] uppercase tracking-widest2 text-muted">
            Lumière
          </p>
        </div>
      </div>
    )
  }