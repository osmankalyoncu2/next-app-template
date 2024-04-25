import { cookies } from "next/headers"

import MiniNav from "./Navigation";

// Prop Types
import PropTypes from 'prop-types'

NavigationProvider.propTypes = {
    children: PropTypes.node
};

export default function NavigationProvider({
    children
}) {
    const layout = cookies().get("react-resizable-panels:layout")
    const collapsed = cookies().get("react-resizable-panels:collapsed")

    const defaultLayout = layout ? JSON.parse(layout.value) : [15, 85];
    const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : false;

    return (
            <MiniNav defaultCollapsed={defaultCollapsed} defaultLayout={defaultLayout}>
                {children}
            </MiniNav>
    )
}