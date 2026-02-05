"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { useIsMobile } from "@/hooks/use-mobile";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

// Dummy FlowOps chart data: Requests per day
const chartData = [
  { date: "2024-06-01", open: 5, inProgress: 3, resolved: 2 },
  { date: "2024-06-02", open: 8, inProgress: 2, resolved: 4 },
  { date: "2024-06-03", open: 6, inProgress: 5, resolved: 3 },
  { date: "2024-06-04", open: 3, inProgress: 6, resolved: 5 },
  { date: "2024-06-05", open: 7, inProgress: 4, resolved: 6 },
  { date: "2024-06-06", open: 4, inProgress: 3, resolved: 7 },
  { date: "2024-06-07", open: 5, inProgress: 2, resolved: 8 },
];

const chartConfig = {
  open: { label: "Open", color: "var(--primary)" },
  inProgress: { label: "In Progress", color: "var(--secondary)" },
  resolved: { label: "Resolved", color: "var(--success)" },
} satisfies ChartConfig;

export function ChartAreaInteractive() {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = React.useState("7d");

  React.useEffect(() => {
    if (isMobile) setTimeRange("7d");
  }, [isMobile]);

  // Filter data based on time range (7d / 30d / 90d)
  const filteredData = chartData.slice(-parseInt(timeRange));

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Requests per Day</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Total requests for the selected period
          </span>
          <span className="@[540px]/card:hidden">Requests overview</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
          >
            <ToggleGroupItem value="90">Last 90 days</ToggleGroupItem>
            <ToggleGroupItem value="30">Last 30 days</ToggleGroupItem>
            <ToggleGroupItem value="7">Last 7 days</ToggleGroupItem>
          </ToggleGroup>

          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 7 days" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90" className="rounded-lg">
                Last 90 days
              </SelectItem>
              <SelectItem value="30" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillOpen" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--primary)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--primary)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillInProgress" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--secondary)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--secondary)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillResolved" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--success)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--success)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="open"
              type="natural"
              fill="url(#fillOpen)"
              stroke="var(--primary)"
              stackId="a"
            />
            <Area
              dataKey="inProgress"
              type="natural"
              fill="url(#fillInProgress)"
              stroke="var(--secondary)"
              stackId="a"
            />
            <Area
              dataKey="resolved"
              type="natural"
              fill="url(#fillResolved)"
              stroke="var(--success)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
