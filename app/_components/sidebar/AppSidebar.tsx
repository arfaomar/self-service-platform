"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { Headset, NotepadText } from "lucide-react";

import { NavMain } from "@components/sidebar/NavMain";
import { NavUser } from "@components/sidebar/NavUser";
import { OrganizationSwitcher } from "@components/sidebar/OrganizationSwitcher";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@components/ui/Sidebar";
import { NavHome } from "@components/sidebar/NavHome";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const pathname = usePathname();
    const currentSection = pathname.split("/")[1] || "";

    const data = {
        navMain: [
            {
                title: "Support",
                url: "#",
                icon: Headset,
                isActive: currentSection.toLowerCase() === "support",
                items: [
                    {
                        title: "Submit Ticket",
                        url: "/support/submit-ticket",
                    },
                    {
                        title: "My Tickets",
                        url: "/support/my-tickets",
                    },
                ],
            },
            {
                title: "Request Equipment",
                url: "#",
                icon: NotepadText,
                isActive: currentSection.toLowerCase() === "equipment-request",
                items: [
                    {
                        title: "Equipment Shop",
                        url: "#",
                    },
                    {
                        title: "My Requests",
                        url: "#",
                    },
                ],
            },
        ],
    };

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <OrganizationSwitcher />
            </SidebarHeader>
            <SidebarContent>
                <NavHome />
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
