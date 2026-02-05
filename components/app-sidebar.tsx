"use client";

import * as React from "react";
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react";

import { NavDocuments } from "@/components/nav-documents";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: IconDashboard,
    },
    {
      title: "Overview KPIs",
      url: "#",
      icon: IconListDetails,
    },
    {
      title: "Activity feed",
      url: "#",
      icon: IconChartBar,
    },
    {
      title: "Quick stats",
      url: "#",
      icon: IconFolder,
    },
  ],

  navClouds: [
    {
      title: "Capture",
      icon: IconCamera,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: IconFileDescription,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: IconFileAi,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ],
  requests: [
    {
      title: "All Requests",
      url: "#",
      icon: IconDatabase,
    },
    {
      title: "Open Requests",
      url: "#",
      icon: IconReport,
    },
    {
      title: "In Progress",
      url: "#",
      icon: IconFileWord,
    },
    {
      title: "Resolved",
      url: "#",
      icon: IconFileWord,
    },
  ],
  assignments: [
    {
      title: "Requests Assigned to Me",
      url: "#",
      icon: IconDatabase,
    },
    {
      title: "Team Workload View",
      url: "#",
      icon: IconReport,
    },
  ],
  clients: [
    {
      title: "List of Clients",
      url: "#",
      icon: IconDatabase,
    },
    {
      title: "Requests Per Client",
      url: "#",
      icon: IconReport,
    },
  ],
  team: [
    {
      title: "Team Members",
      url: "#",
      icon: IconDatabase,
    },
    {
      title: "Roles",
      url: "#",
      icon: IconReport,
    },
    {
      title: "Workload Stats",
      url: "#",
      icon: IconReport,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">FlowOps</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavSecondary items={data.navMain} />
        <SidebarGroupContent>
          <SidebarGroupLabel>Requests</SidebarGroupLabel>
          <NavSecondary items={data.requests} className="mt-auto" />
        </SidebarGroupContent>
        <SidebarGroupContent>
          <SidebarGroupLabel>Assignments</SidebarGroupLabel>
          <NavSecondary items={data.assignments} className="mt-auto" />
        </SidebarGroupContent>
        <SidebarGroupContent>
          <SidebarGroupLabel>Clients</SidebarGroupLabel>
          <NavSecondary items={data.clients} className="mt-auto" />
        </SidebarGroupContent>
        <SidebarGroupContent>
          <SidebarGroupLabel>Team</SidebarGroupLabel>
          <NavSecondary items={data.team} className="mt-auto" />
        </SidebarGroupContent>

        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
