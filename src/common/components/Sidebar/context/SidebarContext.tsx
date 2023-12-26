import * as React from "react"

type SidebarContextData = {
  expanded: boolean;
  toggleSidebar: () => void;
}

export const SidebarContext = React.createContext({} as SidebarContextData)

type SidebarProviderProps = {
  children: React.ReactNode;
}

export const SidebarProvider = ({ children }: SidebarProviderProps) => {
  const [expanded, setExpanded] = React.useState(true)

  const toggleSidebar = () => {
    setExpanded(state => !state)
  }
  return <SidebarContext.Provider value={{ expanded, toggleSidebar }}>{children}</SidebarContext.Provider>
}

export const useSidebar = () => {
  const context = React.useContext(SidebarContext)

  if (!context) {
    throw new Error("Can not use useSidebar hook without wrap SidebarProvider");
  }

  return context
}