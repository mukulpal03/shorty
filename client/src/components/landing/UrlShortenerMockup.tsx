import { ArrowRight, Copy, MousePointerClick, TrendingUp, type LucideIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { SITE } from "@/constants/landing"
import { cn } from "@/lib/utils"

type UrlShortenerMockupProps = {
  className?: string
}

export function UrlShortenerMockup({ className }: UrlShortenerMockupProps) {
  return (
    <div className={cn("relative mx-auto w-full max-w-xl", className)}>
      <div
        aria-hidden
        className="absolute -inset-4 rounded-3xl bg-linear-to-b from-foreground/5 to-transparent blur-2xl"
      />

      <Card className="relative overflow-hidden shadow-lg shadow-foreground/5 ring-foreground/8">
        <CardContent className="space-y-4 pt-0">
          <div className="space-y-2">
            <Label htmlFor="destination-url">Destination URL</Label>
            <InputGroup className="h-10 bg-muted/40">
              <InputGroupInput
                id="destination-url"
                readOnly
                value="https://your-website.com/blog/launch-announcement"
                className="font-mono text-muted-foreground"
              />
            </InputGroup>
          </div>

          <div className="flex items-center justify-center">
            <Badge variant="outline" className="size-8 rounded-full p-0">
              <ArrowRight className="size-4" />
            </Badge>
          </div>

          <div className="space-y-2">
            <Label htmlFor="short-link">Short link</Label>
            <InputGroup className="h-10 border-primary/20 bg-primary/5">
              <InputGroupInput
                id="short-link"
                readOnly
                value={`${SITE.domain}/launch`}
                className="font-mono font-medium"
              />
              <InputGroupAddon align="inline-end">
                <InputGroupButton aria-label="Copy link">
                  <Copy />
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </div>

          <Separator />

          <ItemGroup className="grid grid-cols-3 gap-3">
            <StatItem icon={MousePointerClick} label="Clicks" value="2,847" />
            <StatItem icon={TrendingUp} label="CTR" value="12.4%" />
            <StatItem icon={ArrowRight} label="Redirects" value="<50ms" />
          </ItemGroup>
        </CardContent>
      </Card>
    </div>
  )
}

type StatItemProps = {
  icon: LucideIcon
  label: string
  value: string
}

function StatItem({ icon: Icon, label, value }: StatItemProps) {
  return (
    <Item variant="muted" size="xs" className="flex-col items-center text-center">
      <ItemMedia variant="icon">
        <Icon />
      </ItemMedia>
      <ItemContent className="items-center text-center">
        <ItemDescription className="text-[10px] uppercase tracking-wide">
          {label}
        </ItemDescription>
        <ItemTitle className="tabular-nums">{value}</ItemTitle>
      </ItemContent>
    </Item>
  )
}
