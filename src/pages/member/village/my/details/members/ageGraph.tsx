import { appConst } from "@/app/const/appConst";
import { useEffect, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { memberType } from "./[id]";

interface Props {
  data : memberType[],
}

interface graphDataType {
  name: string, 
  value: number,
}

export const AgeGraph: React.FC<Props> = ({
  data
}) => {
  const COLORS = ["#FFF599", "#B5B9D8", "#80D7C2", "#E496B7", "#E7EF9A", "#D495C3", "#86C5E1", "#F3C19B", "#83DADA"];

  const [graphData, setGraphData] = useState([
    { name: 'それ以下', key: 0, value: 0 },
    { name: '10代', key: 10, value: 0 },
    { name: '20代', key: 20, value: 0 },
    { name: '30代', key: 30, value: 0 },
    { name: '40代', key: 40, value: 0 },
    { name: '50代', key: 50, value: 0 },
    { name: '60代', key: 60, value: 0 },
    { name: '70代', key: 70, value: 0 },
    { name: '80代', key: 80, value: 0 },
    { name: 'それ以上', key: 90, value: 0 },
  ]);

  useEffect(() => {
    let age_0 = 0;
    let age_10 = 0;
    let age_20 = 0;
    let age_30 = 0;
    let age_40 = 0;
    let age_50 = 0;
    let age_60 = 0;
    let age_70 = 0;
    let age_80 = 0;
    let age_90 = 0;
    data.map((memberInfo) => {
      switch (Math.floor(Number(memberInfo.age)/10)) {
        case 0:
          age_0++;
          break;
        case 1:
          age_10++;
          break;
        case 2:
          age_20++;
          break;
        case 3:
          age_30++;
          break;
        case 4:
          age_40++;
          break;
        case 5:
          age_50++;
          break;
        case 6:
          age_60++;
          break;
        case 7:
          age_70++;
          break;
        case 8:
          age_80++;
          break;
        case 9:
          age_90++;
          break;
        default:
          break;
      }
    });
    setGraphData([
      { name: 'それ以下', key: 0, value: age_0 },
      { name: '10代', key: 10, value: age_10 },
      { name: '20代', key: 20, value: age_20 },
      { name: '30代', key: 30, value: age_30 },
      { name: '40代', key: 40, value: age_40 },
      { name: '50代', key: 50, value: age_50 },
      { name: '60代', key: 60, value: age_60 },
      { name: '70代', key: 70, value: age_70 },
      { name: '80代', key: 80, value: age_80 },
      { name: 'それ以上', key: 90, value: age_90 },
    ]);
  }, [data]);

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = (pieLabel : any) => {
    if(pieLabel.value === 0) return undefined;
    const radius = 5 + pieLabel.innerRadius + (pieLabel.outerRadius - pieLabel.innerRadius);
    console.log(pieLabel)
    const x = pieLabel.cx + radius * Math.cos(-pieLabel.midAngle * RADIAN);
    const y = pieLabel.cy + radius * Math.sin(-pieLabel.midAngle * RADIAN);
  
    return (
      <text x={x} y={y} fill={'#A26749'} style={{fontSize: 11}} textAnchor={x > pieLabel.cx ? 'start' : 'end'} dominantBaseline="central" >
        {pieLabel.name}
      </text>
    );
  };

  return (
    <ResponsiveContainer width={"100%"} height={"100%"}>
      <PieChart>
          <Pie 
            data={graphData} 
            dataKey="value" 
            cx="50%" 
            cy="50%" 
            outerRadius={50} 
            fill="#82ca9d" 
            legendType="circle"
            labelLine={false}
            label={renderCustomizedLabel}
          >
            {graphData.map((entry, index) => (
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
export default AgeGraph
