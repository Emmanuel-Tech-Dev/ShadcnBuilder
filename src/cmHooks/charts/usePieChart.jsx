import { useMemo, useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label, Pie, Sector } from "recharts";
import { PieChart } from "recharts";
import {
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartStyle,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
// import { TrendingDown, TrendingUp } from "lucide-react";
import utils from "@/helpers/utilites";
import { TrendingUp } from "lucide-react";

const desktopData = [
    { month: "january", desktop: 186, fill: "var(--color-january)" },
    { month: "february", desktop: 305, fill: "var(--color-february)" },
    { month: "march", desktop: 237, fill: "var(--color-march)" },
    { month: "april", desktop: 173, fill: "var(--color-april)" },
    { month: "may", desktop: 209, fill: "var(--color-may)" },
];

const usePieChart = (chartDesc = {}) => {
    const defaultValue = {
        title: "Pie Chart - Interactive",
        description: "Showing total visitors for the last 3 months",
        ...chartDesc,
    };

    const [chartTextValues, setChartTextValues] = useState(defaultValue);

    // const keyMapping = {
    //     labelKey: "Visitors", // The key for labels
    //     valueKeys: ["desktop", "mobile"], // The keys for pie chart values
    //     // Icons (optional)
    // };

    const chartConfig = utils.generateChartConfig("PieChart", desktopData);

    console.log(chartConfig)


    const PieChartJSX = (data = desktopData) => {
        const id = "pie-interactive";
        const [activeMonth, setActiveMonth] = useState(data[0].month);

        const activeIndex = useMemo(
            () => data.findIndex((item) => item.month === activeMonth),
            [activeMonth]
        );

        const months = useMemo(() => data.map((item) => item.month), []);

        return (
            <Card data-chart={id} className="flex flex-col">
                <ChartStyle id={id} config={chartConfig} />
                <CardHeader className="flex-row items-start space-y-0 pb-0">
                    <div className="grid gap-1">
                        <CardTitle>{chartTextValues?.title}</CardTitle>
                        <CardDescription>January - June 2024</CardDescription>
                    </div>
                    <Select value={activeMonth} onValueChange={setActiveMonth}>
                        <SelectTrigger
                            className="ml-auto h-7 w-[130px] rounded-lg pl-2.5"
                            aria-label="Select a value"
                        >
                            <SelectValue placeholder="Select month" />
                        </SelectTrigger>
                        <SelectContent align="end" className="rounded-xl">
                            {months.map((key) => {
                                const config = chartConfig[key];

                                if (!config) {
                                    return null;
                                }

                                return (
                                    <SelectItem
                                        key={key}
                                        value={key}
                                        className="rounded-lg [&_span]:flex"
                                    >
                                        <div className="flex items-center gap-2 text-xs">
                                            <span
                                                className="flex h-3 w-3 shrink-0 rounded-sm"
                                                style={{
                                                    backgroundColor: chartConfig[key]?.color,
                                                }}
                                            />
                                            {config?.label}
                                        </div>
                                    </SelectItem>
                                );
                            })}
                        </SelectContent>
                    </Select>
                </CardHeader>
                <CardContent className="flex flex-1 justify-center pb-0">
                    <ChartContainer
                        id={id}
                        config={chartConfig}
                        className="mx-auto aspect-square w-full max-w-[300px]"
                    >
                        <PieChart>
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent hideLabel />}
                            />
                            <Pie
                                data={desktopData}
                                dataKey="desktop"
                                nameKey="month"
                                innerRadius={60}
                                strokeWidth={5}
                                activeIndex={activeIndex}
                                activeShape={({ outerRadius = 0, ...props }) => (
                                    <g>
                                        <Sector {...props} outerRadius={outerRadius + 10} />
                                        <Sector
                                            {...props}
                                            outerRadius={outerRadius + 25}
                                            innerRadius={outerRadius + 12}
                                        />
                                    </g>
                                )}
                            >
                                <Label
                                    content={({ viewBox }) => {
                                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                            return (
                                                <text
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    textAnchor="middle"
                                                    dominantBaseline="middle"
                                                >
                                                    <tspan
                                                        x={viewBox.cx}
                                                        y={viewBox.cy}
                                                        className="fill-foreground text-3xl font-bold"
                                                    >
                                                        {desktopData[activeIndex].desktop.toLocaleString()}
                                                    </tspan>
                                                    <tspan
                                                        x={viewBox.cx}
                                                        y={(viewBox.cy || 0) + 24}
                                                        className="fill-muted-foreground"
                                                    >
                                                        Visitors
                                                    </tspan>
                                                </text>
                                            );
                                        }
                                    }}
                                />
                            </Pie>
                            <ChartLegend
                                content={<ChartLegendContent nameKey="month" />}
                                className=" -translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
                            />
                        </PieChart>
                    </ChartContainer>
                </CardContent>
                <CardFooter className="flex-col gap-2 text-sm">
                    <div className="flex items-center gap-2 font-medium leading-none">
                        Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                    </div>
                    <div className="leading-none text-muted-foreground">
                        Showing total visitors for the last 6 months
                    </div>
                </CardFooter>
            </Card>
        );
    };


    return { PieChartJSX, setChartTextValues };
};

export default usePieChart;
