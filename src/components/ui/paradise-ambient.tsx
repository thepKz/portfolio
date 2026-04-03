"use client"

/**
 * Fixed substrate — Swiss industrial documentation paper + mechanical grain.
 * No gradients or animated blobs (industrial brutalism substrate).
 */
export function ParadiseAmbient() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[1] bg-[#F4F4F0]" aria-hidden>
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  )
}
