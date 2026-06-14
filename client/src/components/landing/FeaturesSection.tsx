import { SectionHeader } from "@/components/common/SectionHeader"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { FEATURES } from "@/constants/landing"

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Features"
          title="Everything you need to manage links at scale"
          description="From solo creators to growing teams, Shorty gives you the tools to create, share, and measure every link."
        />

        <ItemGroup className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <Item
              key={feature.title}
              variant="outline"
              className="flex-col items-start hover:bg-muted/30"
            >
              <ItemMedia
                variant="icon"
                className="size-9 rounded-lg border border-border bg-muted/50"
              >
                <feature.icon />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>{feature.title}</ItemTitle>
                <ItemDescription className="line-clamp-none">
                  {feature.description}
                </ItemDescription>
              </ItemContent>
            </Item>
          ))}
        </ItemGroup>
      </div>
    </section>
  )
}
