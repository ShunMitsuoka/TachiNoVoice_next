import { appConst } from "@/app/const/appConst";
import { useEffect, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Text } from "recharts";
import { Satisfaction } from "villageType";

interface Props {
  data : Satisfaction[],
}

export const SatisfactionGraph: React.FC<Props> = ({
  data
}) => {
  const [graphData, setGraphData] = useState([
    { key: 1, value: 0, name : 'test'},
    { key: 2, value: 0, name : 'test'},
    { key: 3, value: 0, name : 'test'},
    { key: 4, value: 0, name : 'test'},
    { key: 5, value: 0, name : 'test'},
  ]);

  useEffect(() => {
    let level_1 = 0;
    let level_2 = 0;
    let level_3 = 0;
    let level_4 = 0;
    let level_5 = 0;
    data.map((satisfactionInfo) => {
      switch (satisfactionInfo.level) {
        case 1:
            level_1++;
            break;
        case 2:
            level_2++;
            break;
        case 3:
            level_3++;
            break;
        case 4:
            level_4++;
            break;
        case 5:
            level_5++;
            break;
        default:
          break;
      }
    });
    setGraphData([
        { key: 1, value: level_1, name : 'test'},
        { key: 2, value: level_2, name : 'test'},
        { key: 3, value: level_3, name : 'test'},
        { key: 4, value: level_4, name : 'test'},
        { key: 5, value: level_5, name : 'test'},
    ]);
  }, [data]);

  useEffect(() => {
    console.log(graphData);
  }, [graphData]);

  const levelColor = (level : number) => {
    switch (level) {
      case 1:
        return "#A0D2ED";
      case 2:
        return "#E9C3CE";
      case 3:
        return "#DFE7C0";
      default:
        break;
    }
    return "";
  }

  // const label = (prpps : { name : string, value : number, cx : any, x : number, y : number }) => {
  //   return (
  //     <>
  //       <Text x={prpps.x} y={prpps.y} fill="#82ca9d" className="text-sm">{prpps.name}</Text>
  //     </>
  //   )
  // }

  return (
    <ResponsiveContainer aspect={1} height={"100%"}>
      <PieChart>
          <Pie data={graphData} dataKey="value" cx="50%" cy="50%" outerRadius={50} fill="#82ca9d" legendType="none">
            {graphData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={levelColor(entry.key)}
              />
            ))}
          </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
  
}
export default SatisfactionGraph
