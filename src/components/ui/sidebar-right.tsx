import * as React from "react"
import { DatePicker } from "@/components/ui/date-picker"
import {
  Sidebar,
  SidebarContent,
  SidebarSeparator,
} from "@/components/ui/sidebar"

export function SidebarRight({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible="none"
      className="sticky top-0 hidden h-svh border-l lg:flex"
      {...props}
    >
      <SidebarContent>
        <DatePicker />
        <SidebarSeparator className="mx-0 border-b border-foreground" />
        <p>Historico de transações aqui!</p>
      </SidebarContent>
    </Sidebar>
  )
}
