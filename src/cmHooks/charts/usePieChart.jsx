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

const colorPalette = [
    "var(--color-january)",
    "var(--color-february)",
    "var(--color-march)",
    "var(--color-april)",
    "var(--color-may)",
    "var(--color-june)",
    "var(--color-july)",
    "var(--color-august)",
    "var(--color-september)",
    "var(--color-october)",
    "var(--color-november)",
    "var(--color-december)",
];

const desktopData = [
    { month: "january", desktop: 186 },
    { month: "february", desktop: 305 },
    { month: "march", desktop: 237 },
    { month: "april", desktop: 173 },
    { month: "may", desktop: 209 },
    { month: "june", desktop: 209 },
    { month: "july", desktop: 209 },
    { month: "august", desktop: 209 },
];

const usePieChart = (
    chartDesc = {},
    apiData = desktopData,
    palates = colorPalette
) => {
    const defaultValue = {
        title: "Pie Chart - Interactive",
        description: "Showing total visitors for the last 3 months",
        ...chartDesc,
    };
    const [chartTextValues, setChartTextValues] = useState(defaultValue);

    const newApiData = utils.addColorsToData(apiData, palates).map((item) => ({
        ...item,
        month: item.category, // Ensure 'month' key exists for chart functionality
    }));

    console.log("API DATA :", newApiData);

    const keyMapping = {
        labelKey: "category", // Key for labels
        valueKeys: ["category"], // Keys for chart values
    };

    const chartConfig = utils.generateChartConfig(
        "PieChart",
        newApiData,
        keyMapping
    );

    console.log(chartConfig);

    const PieChartJSX = (
        data = newApiData,
        dataKey = "desktop",
        nameKey = "month",
        targetKey = "month",
        lableName = "Visitors"
    ) => {
        const id = "pie-interactive";
        const [activeMonth, setActiveMonth] = useState(
            data[0][Object.keys(data[0])[0]]
        );

        const activeIndex = useMemo(
            () => data.findIndex((item) => item.month === activeMonth),
            [activeMonth]
        );

        const targetData = useMemo(
            () => [...new Set(data.map((item) => item[targetKey]))],
            [data]
        );

        // console.log(targetData, activeMonth)

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
                            {targetData.map((month) => {
                                const tData = data.find((item) => item[targetKey] === month);
                                if (!tData) return null;



                                return (
                                    <SelectItem
                                        key={month}
                                        value={month}
                                        className="rounded-lg [&_span]:flex"
                                    >
                                        <div className="flex items-center gap-2 text-xs">
                                            <span
                                                className="flex h-3 w-3 shrink-0 rounded-sm"
                                                style={{
                                                    backgroundColor: tData.fill,
                                                }}
                                            />
                                            {tData.month}
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
                                data={data}
                                dataKey={dataKey}
                                nameKey={nameKey}
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
                                            const value = data[activeIndex]?.[dataKey];
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
                                                        {value.toLocaleString()}
                                                    </tspan>
                                                    <tspan
                                                        x={viewBox.cx}
                                                        y={(viewBox.cy || 0) + 24}
                                                        className="fill-muted-foreground"
                                                    >
                                                        {lableName}
                                                    </tspan>
                                                </text>
                                            );
                                        }
                                    }}
                                />
                            </Pie>
                            <ChartLegend
                                content={<ChartLegendContent nameKey={nameKey} />}
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
