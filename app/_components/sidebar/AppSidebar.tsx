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
import { useAuth } from "@clerk/nextjs";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const pathname = usePathname();
    const currentSection = pathname.split("/")[1] || "";
    const auth = useAuth();
    const data = {
        navMain: [
            {
                title: "Support",
                url: "#",
                icon: Headset,
                isActive: currentSection.toLowerCase() === "support",
                items: [
                    // USER + MANAGER + ADMIN
                    {
                        title: "Submit Ticket",
                        url: "/support/submit-ticket",
                    },
                    // USER + MANAGER + ADMIN
                    {
                        title: "My Tickets",
                        url: "/support/my-tickets",
                    },
                    // SUPPORT + ADMIN
                    {
                        title: "( All Tickets )",
                        url: "#",
                    },
                ],
                requirePermission: "org:tickets:submit",
            },
            {
                title: "Equipment",
                url: "#",
                icon: NotepadText,
                isActive: currentSection.toLowerCase() === "equipment",
                items: [
                    ...(auth.orgRole && ["org:manager", "org:admin"].includes(auth.orgRole) ? [
                        {
                            title: "List",
                            url: "/equipment/list",
                        },
                    ] : []),
                    // USER + SUPPORT + ADMIN + MANAGER (directly assign)
                    {
                        title: "Shop",
                        url: "/equipment/shop",
                    },
                    // USER + MANAGER + SUPPORT + ADMIN
                    {
                        title: "( My Equipments )",
                        url: "#",
                    },
                    // USER + SUPPORT + ADMIN
                    {
                        title: "( My Requests )",
                        url: "#",
                    },
                    // MANAGER + ADMIN
                    {
                        title: "( All Requests )",
                        url: "#",
                    },
                ],
            },
        ],
    };

    if (auth.orgRole === "org:admin") {
        data.navMain.push({
            title: "Manage",
            url: "#",
            icon: NotepadText,
            isActive: currentSection.toLowerCase() === "manage",
            items: [
                {
                    title: "( Equipments )",
                    url: "#",
                },
                {
                    title: "Categories",
                    url: "/manage/categories",
                },
            ],
        })
    }


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
