import { NextPage } from "next";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

const Graph: NextPage = () => {

  const data = [
      {
        index: 0,
        name: 'データ1',
        value: 300,
      },
      {
        index: 1,
        name: 'データ2',
        value: 200,
      },
      {
        index: 2,
        name: 'データ3',
        value: 380,
      },
      {
        index: 3,
        name: 'データ3',
        value: 80,
      },
      {
        index: 4,
        name: 'データ4',
        value: 40,
      }
    ]


    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <ResponsiveContainer aspect={1} height={"100%"}>
      <PieChart>
          <Pie data={data} dataKey="value" cx="50%" cy="50%" outerRadius={50} fill="#82ca9d" legendType="none">
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
      </PieChart>
    </ResponsiveContainer>
  )
}

export default Graph
