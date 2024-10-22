import { useState } from "react";
import { useNavigate } from "@remix-run/react";
import { Bar, BarChart, Cell, XAxis, YAxis } from "recharts";
import { colord } from "colord";
import { Color } from "~/clients/api";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "~/components/ui/chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "~/components/ui/select";

export interface ColorsChartProps {
  defaultTab: "all" | "dark" | "light";
  colors: Color[];
}

const chartConfig = {
  count: {
    label: "Total",
    color: "hsl(var(--vsct-1))",
  },
  label: {
    color: "hsl(var(--background))",
  },
} satisfies ChartConfig;

const getLightness = (hex: string) => {
  const { l } = colord(hex).toHsl();
  return l;
};

const getHue = (hex: string) => {
  const { h } = colord(hex).toHsl();
  return h;
};

const getSaturation = (hex: string) => {
  const { s } = colord(hex).toHsl();
  return s;
};

export function ColorsChart({
  defaultTab,
  colors: allColors,
}: ColorsChartProps) {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState("count");

  const sortedColors = allColors.sort((a, b) => {
    if (sortBy === "darkest") {
      return getLightness(a.hex) - getLightness(b.hex);
    } else if (sortBy === "lightest") {
      return getLightness(b.hex) - getLightness(a.hex);
    } else if (sortBy === "hue") {
      const delta = getHue(a.hex) - getHue(b.hex);
      return delta <= 5 ? getLightness(a.hex) - getLightness(b.hex) : delta;
    } else if (sortBy === "saturation") {
      const delta = getSaturation(a.hex) - getSaturation(b.hex);
      return delta <= 5 ? getLightness(a.hex) - getLightness(b.hex) : delta;
    } else {
      return b.count - a.count;
    }
  });

  const darkColors = sortedColors.filter((color) => colord(color.hex).isDark());
  const lightColors = sortedColors.filter((color) =>
    colord(color.hex).isLight()
  );

  console.log({
    all: sortedColors.map((color) => color.hex),
    dark: darkColors.map((color) => color.hex),
    light: lightColors.map((color) => color.hex),
  });

  const renderChart = (colors: Color[]) => {
    return (
      <BarChart
        accessibilityLayer
        data={colors}
        layout="vertical"
        margin={{ right: 16 }}
      >
        <YAxis
          dataKey="hex"
          type="category"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
          hide
        />
        <XAxis dataKey="count" type="number" hide />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="line" />}
        />
        <Bar
          dataKey="count"
          layout="vertical"
          fill="var(--color-count)"
          radius={8}
          minPointSize={12}
        >
          {colors.map((color, index) => (
            <Cell
              key={`cell-${index}`}
              fill={color.hex}
              stroke="hsl(var(--accent))"
              onClick={() =>
                navigate({
                  pathname: "/",
                  search: `?q=${encodeURIComponent(color.hex)}`,
                })
              }
            />
          ))}
        </Bar>
      </BarChart>
    );
  };

  return (
    <Tabs defaultValue={defaultTab}>
      <div className="flex flex-color gap-8  mb-6">
        <h1 className="text-2xl font-bold">Top Colors</h1>
        <TabsList>
          <TabsTrigger value="all">All Colors</TabsTrigger>
          <TabsTrigger value="dark">Dark</TabsTrigger>
          <TabsTrigger value="light">Light</TabsTrigger>
        </TabsList>
        <div className="flex flex-row gap-4 items-center">
          Sort By:
          <Select defaultValue="count" onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sort By</SelectLabel>
                <SelectItem value="count">Count</SelectItem>
                <SelectItem value="darkest">Darkest</SelectItem>
                <SelectItem value="lightest">Lightest</SelectItem>
                <SelectItem value="hue">Hue</SelectItem>
                <SelectItem value="saturation">Saturation</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <TabsContent value="all">
        <ChartContainer config={chartConfig}>
          {renderChart(allColors)}
        </ChartContainer>
      </TabsContent>
      <TabsContent value="dark">
        <ChartContainer config={chartConfig}>
          {renderChart(darkColors)}
        </ChartContainer>
      </TabsContent>
      <TabsContent value="light">
        <ChartContainer config={chartConfig}>
          {renderChart(lightColors)}
        </ChartContainer>
      </TabsContent>
      <TabsContent value="password">Change your password here.</TabsContent>
    </Tabs>
  );
}
