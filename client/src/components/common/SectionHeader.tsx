import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

type SectionHeaderProps = {
  eyebrow?: string
  title: string
  description?: string
  align?: "left" | "center"
  className?: string
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <Badge variant="outline" className="mb-3 uppercase">
          {eyebrow}
        </Badge>
      )}
      <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg">
          {description}
        </p>
      )}
    </div>
  )
}
