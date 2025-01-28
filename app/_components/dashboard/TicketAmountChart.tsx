"use client";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@components/ui/Card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@components/ui/Chart";
import { CartesianGrid, XAxis, BarChart, Bar } from "recharts";
import { TicketAmountChartData } from "@lib/data/useCases/getSupportDashboardChartData";

interface TicketAmountChartProps {
    chartData: TicketAmountChartData[];
}

export default function TicketAmountChart({
    chartData,
}: TicketAmountChartProps) {
    const chartConfig = {
        month: {
            label: "Month",
            color: "hsl(var(--chart-1))",
        },
    } satisfies ChartConfig;

    return (
        <Card className="aspect-video rounded-xl bg-muted/50 flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Ticket Histogram</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer config={chartConfig} className="max-h-[360px] mx-auto container">
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar
                            dataKey="count"
                            fill="var(--color-month)"
                            radius={10}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>

        </Card>
    );
}
