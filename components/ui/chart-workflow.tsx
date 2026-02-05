"use client";

import * as React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const teamWorkload = [
  { member: "Ali Raza", requests: 12 },
  { member: "Ayesha Malik", requests: 8 },
  { member: "Omar Siddiqui", requests: 5 },
  { member: "Sarah Khan", requests: 3 },
];

const chartConfig = {
  requests: { label: "Requests", color: "#4F46E5" },
} satisfies ChartConfig;

export function ChartTeamWorkload() {
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Workload by Team Member</CardTitle>
        <CardDescription>
          Number of active requests assigned to each team member
        </CardDescription>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={teamWorkload}
              margin={{ top: 20, right: 20, bottom: 20, left: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="member" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip
                content={(tooltipProps: any) => {
                  // Only render if tooltip is active
                  if (!tooltipProps.active || !tooltipProps.payload)
                    return null;

                  const payload = tooltipProps.payload[0];
                  return (
                    <ChartTooltipContent
                      label={tooltipProps.label}
                      labelFormatter={(value) => `Team Member: ${value}`}
                      formatter={() => [`${payload.value} requests`]}
                      color={chartConfig.requests.color}
                    />
                  );
                }}
              />
              <Bar
                dataKey="requests"
                fill={chartConfig.requests.color}
                barSize={32}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
