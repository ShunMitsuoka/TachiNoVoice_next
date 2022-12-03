import { appConst } from "@/app/const/appConst";
import { useEffect, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Text } from "recharts";
import { memberType } from "./[id]";

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
      { name: 'それ他', value: lgbtNum, gender : appConst.user.gender.LGBT },
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
                fill={genderColor(entry.gender)}
              />
            ))}
          </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
  
}
export default GenderGraph
