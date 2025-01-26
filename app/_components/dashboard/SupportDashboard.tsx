"use client";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartLegend,
    ChartLegendContent,
} from "@components/ui/Chart";

import { Pie, PieChart } from "recharts";
import { TicketStatusChartData } from "@lib/data/useCases/getSupportDashboardChartData";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@components/ui/Card";

interface SupportDashboardProps {
    chartData: TicketStatusChartData[];
}

export default function SupportDashboard({ chartData }: SupportDashboardProps) {
    const chartConfig = {
        count: {
            label: "Tickets",
        },
        open: {
            label: "Open",
            color: "hsl(var(--chart-1))",
        },
        closed: {
            label: "Closed",
            color: "hsl(var(--chart-5))",
        },
        inProgress: {
            label: "In Progress",
            color: "hsl(var(--chart-4))",
        },
        onHold: {
            label: "On Hold",
            color: "hsl(var(--chart-2))",
        },
    } satisfies ChartConfig;

    const chartDataWithFill = chartData.map((data) => {
        let fill;
        switch (data.status) {
            case "Open":
                fill = "var(--color-open)";
                break;
            case "Closed":
                fill = "var(--color-closed)";
                break;
            case "In Progress":
                fill = "var(--color-inProgress)";
                break;
            case "On Hold":
                fill = "var(--color-onHold)";
                break;
        }
        return { ...data, fill };
    });

    return (
        <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <Card className="aspect-video rounded-xl bg-muted/50 flex flex-col">
                    <CardHeader className="items-center pb-0">
                        <CardTitle>Support Tickets</CardTitle>
                        <CardDescription>January 2025 - Today</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 pb-0">
                        <ChartContainer
                            config={chartConfig}
                            className="mx-auto aspect-square max-h-[300px]"
                        >
                            <PieChart>
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent hideLabel />}
                                />
                                <Pie
                                    data={chartDataWithFill}
                                    dataKey="count"
                                    nameKey="status"
                                    innerRadius={60}
                                />
                                <ChartLegend
                                    content={
                                        <ChartLegendContent nameKey="status"/>
                                    }
                                    className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center text-card-foreground"
                                />
                            </PieChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
                <div className="aspect-video rounded-xl bg-muted/50" />
                <div className="aspect-video rounded-xl bg-muted/50" />
            </div>
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </main>
    );
}
