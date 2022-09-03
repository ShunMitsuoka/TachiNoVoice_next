import { NextPage } from "next";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

interface Props {
  id?: string;
  data:[],
}

export const Graph: React.FC<Props> = ({
  id,
  data
}) => {

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  console.log(data)

    return (
      <ResponsiveContainer aspect={1} height={"100%"}>
        <PieChart>
            <Pie data={data} dataKey="age" cx="50%" cy="50%" outerRadius={50} fill="#82ca9d" legendType="none">
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
        </PieChart>
      </ResponsiveContainer>
    );
  
}
export default Graph
