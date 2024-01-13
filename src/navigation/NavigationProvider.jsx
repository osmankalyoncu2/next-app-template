import { cookies } from "next/headers"

import MiniNav from "./Navigation";

export default function NavigationProvider({
    children
}) {
    const layout = cookies().get("react-resizable-panels:layout")
    const collapsed = cookies().get("react-resizable-panels:collapsed")
  
    const defaultLayout = layout ? JSON.parse(layout.value) : false
    const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : [15, 85]
    
    return (
        <>
            <MiniNav defaultCollapsed={defaultCollapsed} defaultLayout={defaultLayout}>
                {children}
            </MiniNav>
        </>
    )
}