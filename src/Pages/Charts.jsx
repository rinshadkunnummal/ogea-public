import GraphCard from "@/components/custom/graph/Graphcard"
import MainGraph from "@/components/custom/graph/MainGraph"
import { MONTHS } from "@/lib/graphdata"

const Charts = () => {
  return (
    <div className="py-10 px-4 md:px-8 lg:px-16 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Total Analytics Chart */}
        <MainGraph />

        {/* Monthwise Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MONTHS.map((month) => (
            <GraphCard key={month} month={month} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Charts