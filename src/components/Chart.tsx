"use client";

import * as React from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import CountUp from "react-countup";

export const description = "A line chart showing article collection progress";

export interface ArticleCount {
  MonthYear: string;
  Count: number;
}

interface ChartProps {
  article_counts: ArticleCount[];
  total_articles: number;
}

const chartConfig = {
  views: {
    label: "Articles",
  },
  articles: {
    label: "Collected Articles",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function ChartLineInteractive({ article_counts, total_articles }: ChartProps) {
  // Transform the data to match the chart's expected format
  const chartData = React.useMemo(() => {
    return article_counts.map(item => {
      const [month, year] = item.MonthYear.split("-");
      // Create a date string in YYYY-MM-01 format
      const date = `${year}-${month}-01`;
      return {
        date,
        articles: item.Count
      };
    });
  }, [article_counts]);

  return (
    <Card className="py-4 sm:py-0">
      <CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pb-3 sm:pb-0">
          <CardTitle>Article Collection</CardTitle>
          <CardDescription>
            Total number of Kirundi articles collected
          </CardDescription>
        </div>
        <div className="flex">
          <div className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left sm:border-t-0 sm:border-l sm:px-8 sm:py-6">
            <span className="text-muted-foreground text-xs">
              {chartConfig.articles.label}
            </span>
            <span className="text-lg leading-none font-bold sm:text-3xl text-[#1B483D]">
              <CountUp end={total_articles} duration={2.5} />
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
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
                  year: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Line
              dataKey="articles"
              type="monotone"
              stroke="#1B483D"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
