import { Button } from "@/components/ui/button"

export function ButtonIcon({children, ...props}: {children: React.ReactNode, [key: string]: any}) {
  return (
    <Button variant="ghost" size="icon" className="size-8" {...props}>
      {children}
    </Button>
  )
}
