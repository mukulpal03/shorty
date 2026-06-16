import { cn } from "@/lib/utils"

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
      {eyebrow ? <p className="shorty-eyebrow">{eyebrow}</p> : null}
      <h2 className="shorty-heading">{title}</h2>
      {description ? (
        <p className={cn("shorty-lead", align === "center" && "mx-auto")}>
          {description}
        </p>
      ) : null}
    </div>
  )
}
