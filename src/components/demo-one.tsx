import { ShaderAnimation } from "@/components/ui/shader-lines"

export function DemoOne() {
  return (
    <div className="relative flex h-[650px] w-full flex-col items-center justify-center overflow-hidden rounded-xl border border-border bg-muted/30">
      <ShaderAnimation />
      <span className="pointer-events-none z-10 text-center font-serif text-7xl font-semibold leading-none tracking-tighter text-white text-balance">
        Shader Lines
      </span>
    </div>
  )
}
