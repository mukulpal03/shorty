import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from "@/components/ui/item"
import { STATS } from "@/constants/landing"

export function StatsSection() {
  return (
    <section className="border-y border-border/60 bg-muted/20">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <ItemGroup className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {STATS.map((stat) => (
            <Item
              key={stat.label}
              variant="default"
              className="flex-col items-center border-transparent text-center"
            >
              <ItemContent className="items-center text-center">
                <ItemDescription>{stat.label}</ItemDescription>
                <ItemTitle className="text-3xl font-semibold tracking-tight tabular-nums sm:text-4xl">
                  {stat.value}
                </ItemTitle>
              </ItemContent>
            </Item>
          ))}
        </ItemGroup>
      </div>
    </section>
  )
}
