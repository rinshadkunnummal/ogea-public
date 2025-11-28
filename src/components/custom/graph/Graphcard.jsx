import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { monthwiseData, chartConfig } from "@/lib/graphdata"

const GraphCard = ({ month }) => {
  // Get data for the selected month
  const chartData = monthwiseData[month] || []

  // Calculate total points for this month
  const totalPoints = chartData.reduce((sum, item) => sum + item.points, 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle>{month}</CardTitle>
        <CardDescription>Batch Performance</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="batch"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent />}
            />
            <Bar dataKey="points" fill="black" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Total: {totalPoints} points
        </div>
        <div className="text-muted-foreground leading-none">
          Showing batch points for {month}
        </div>
      </CardFooter>
    </Card>
  )
}

export default GraphCard