import { appConst } from "@/app/const/appConst";
import { useEffect, useState } from "react";
import { LayoutType } from "recharts/types/util/types";
import { Cell, Legend, Pie, PieChart, PieLabel, ResponsiveContainer, Text } from "recharts";
import { memberType } from "./[id]";
import { type } from "os";

interface Props {
  data : memberType[],
}

export const GenderGraph: React.FC<Props> = ({
  data
}) => {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const [graphData, setGraphData] = useState([
    { name: '男性', value: 0, gender : appConst.user.gender.man },
    { name: '女性', value: 0, gender : appConst.user.gender.woman },
    { name: 'それ他', value: 0, gender : appConst.user.gender.LGBT },
  ]);

  useEffect(() => {
    let manNum = 0;
    let womanNum = 0;
    let lgbtNum = 0;
    data.map((memberInfo) => {
      switch (Number(memberInfo.gender)) {
        case appConst.user.gender.man:
          manNum++;
          break;
        case appConst.user.gender.woman:
          womanNum++;
          break;
        case appConst.user.gender.LGBT:
          lgbtNum++;
          break;
        default:
          break;
      }
    });
    setGraphData([
      { name: '男性', value: manNum, gender : appConst.user.gender.man },
      { name: '女性', value: womanNum, gender : appConst.user.gender.woman },
      { name: 'その他', value: lgbtNum, gender : appConst.user.gender.LGBT },
    ]);
  }, [data]);

  const genderColor = (gender : number) => {
    switch (gender) {
      case appConst.user.gender.man:
        return "#A0D2ED";
      case appConst.user.gender.woman:
        return "#E9C3CE";
      case appConst.user.gender.LGBT:
        return "#DFE7C0";
      default:
        break;
    }
    return "";
  }

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = (pieLabel : any) => {
    if(pieLabel.value === 0) return null;
    console.log(pieLabel)
    const radius = pieLabel.innerRadius + (pieLabel.outerRadius - pieLabel.innerRadius) * 0.4;
    const x = pieLabel.cx + radius * Math.cos(-pieLabel.midAngle * RADIAN);
    const y = pieLabel.cy + radius * Math.sin(-pieLabel.midAngle * RADIAN);
  
    return (
      <text x={x} y={y} fill="white" textAnchor={x > pieLabel.cx ? 'start' : 'end'} dominantBaseline="central" style={{fontSize: 13}}>
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
            outerRadius={45} 
            fill="#82ca9d" 
            labelLine={false}
            label={renderCustomizedLabel}
          >
            {graphData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={genderColor(entry.gender)}
              />
            ))}
          </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
  
}
export default GenderGraph
