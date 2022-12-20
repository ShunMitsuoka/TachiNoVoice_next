import { appConst } from "@/app/const/appConst";
import { useEffect, useState } from "react";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Text } from "recharts";
import { LayoutType } from "recharts/types/util/types";
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
        { key: 1, value: level_1, name : '満足度1'},
        { key: 2, value: level_2, name : '満足度2'},
        { key: 3, value: level_3, name : '満足度3'},
        { key: 4, value: level_4, name : '満足度4'},
        { key: 5, value: level_5, name : '満足度5'},
    ]);
  }, [data]);

  useEffect(() => {
    console.log(graphData);
  }, [graphData]);

  const levelColor = (level : number) => {
    switch (level) {
      case 1:
        return "#C6C6C6";
      case 2:
        return "#97D3E3";
      case 3:
        return "#A6E39D";
      case 4:
        return "#F9E3AA";
      case 5:
        return "#F5CBAB";
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
    <ResponsiveContainer width={'70%'} height={150}>
      <PieChart>
          <Pie 
            data={graphData} 
            dataKey="value" 
            cx="50%" 
            cy="50%" 
            outerRadius={'85%'} 
            fill="#82ca9d" 
            legendType="circle"
          >
            {graphData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={levelColor(entry.key)}
              />
            ))}
          </Pie>
          <Legend   
            layout={'vertical' as LayoutType} 
            align='right'
            verticalAlign="middle" 
            wrapperStyle={{fontSize: ".8rem"}}
          />
      </PieChart>
    </ResponsiveContainer>
  );
  
}
export default SatisfactionGraph
