import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function SectionCards() {
  const stats = [
    {
      title: "Total Revenue",
      value: "$1,250.00",
      change: "+12.5%",
      trend: "up",
      message: "Trending up this month",
      subtext: "Visitors for the last 6 months",
    },
    {
      title: "New Customers",
      value: "1,234",
      change: "-20%",
      trend: "down",
      message: "Down 20% this period",
      subtext: "Acquisition needs attention",
    },
    {
      title: "Active Accounts",
      value: "45,678",
      change: "+12.5%",
      trend: "up",
      message: "Strong user retention",
      subtext: "Engagement exceeds targets",
    },
    {
      title: "Growth Rate",
      value: "4.5%",
      change: "+4.5%",
      trend: "up",
      message: "Steady performance increase",
      subtext: "Meets growth projections",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 xl:grid-cols-2 2xl:grid-cols-4">
      {stats.map((item, index) => {
        const TrendIcon =
          item.trend === "up" ? IconTrendingUp : IconTrendingDown;

        return (
          <Card key={index}>
            <CardHeader>
              <CardDescription>{item.title}</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums">
                {item.value}
              </CardTitle>

              <CardAction>
                <Badge variant="outline">
                  <TrendIcon className="mr-1 h-4 w-4" />
                  {item.change}
                </Badge>
              </CardAction>
            </CardHeader>

            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="flex gap-2 font-medium">
                {item.message}
                <TrendIcon className="size-4" />
              </div>

              <div className="text-muted-foreground">{item.subtext}</div>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
