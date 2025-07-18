
"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface CTAProps {
  badge?: {
    text: string
  }
  title: string
  description?: string
  action: {
    text: string
    href: string
    variant?: "default" | "saudi" | "gradient"
  }
  secondaryAction?: {
    text: string
    href: string
    variant?: "outline" | "ghost" | "saudi-outline"
  }
  withGlow?: boolean
  className?: string
}

export function CTASection({
  badge,
  title,
  description,
  action,
  secondaryAction,
  withGlow = true,
  className,
}: CTAProps) {
  return (
    <section className={cn("w-full overflow-hidden pt-0 md:pt-0", className)}>
      <div className="relative w-full flex flex-col items-center gap-6 px-8 py-12 text-center sm:gap-8 md:py-24">
        {/* Badge */}
        {badge && (
          <Badge
            variant="outline"
            className="opacity-0 animate-fade-in-up delay-100"
          >
            <span>{badge.text}</span>
          </Badge>
        )}

        {/* Title */}
        <h2 className="text-3xl font-semibold sm:text-5xl opacity-0 animate-fade-in-up delay-200">
          {title}
        </h2>

        {/* Description */}
        {description && (
          <p className="text-muted-foreground opacity-0 animate-fade-in-up delay-300">
            {description}
          </p>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in-up delay-500">
          <Button
            variant="default"
            size="lg"
            asChild
          >
            <a href={action.href}>{action.text}</a>
          </Button>
          
          {secondaryAction && (
            <Button
              variant="outline"
              size="lg"
              asChild
            >
              <a href={secondaryAction.href}>{secondaryAction.text}</a>
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}
