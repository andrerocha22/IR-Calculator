import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { ResponsiveContainer, PieChart, Pie, Sector, Cell } from "recharts";

const ChartContainer = styled.div`
  float: left;
  width: 100%;
  height: 100%;
  padding: 20px 10px;
  overflow: hidden;
`;

function OverviewChart(props) {
  const [data, setData] = useState(props.data);

  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  console.log(data)

  return (
    <ChartContainer>
      <ResponsiveContainer width="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="quant"
            cx={100}
            cy={100}
            outerRadius={90}
            fill="#82ca9d"
            label
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

export default OverviewChart;

// import React, { PureComponent } from 'react';
// import {
//   PieChart, Pie, Sector, Cell,
// } from 'recharts';

// // const data01 = [
// //   { name: 'Group A', value: 400 }, { name: 'Group B', value: 300 },
// //   { name: 'Group C', value: 300 }, { name: 'Group D', value: 200 },
// // ];
// // const data02 = [
// //   { name: 'A1', value: 100 },
// //   { name: 'A2', value: 300 },
// //   { name: 'B1', value: 100 },
// //   { name: 'B2', value: 80 },
// //   { name: 'B3', value: 40 },
// //   { name: 'B4', value: 30 },
// //   { name: 'B5', value: 50 },
// //   { name: 'C1', value: 100 },
// //   { name: 'C2', value: 200 },
// //   { name: 'D1', value: 150 },
// //   { name: 'D2', value: 50 },
// // ];

// export default class Example extends PureComponent {

//   render() {
//     return (
//       <PieChart width={200} height={200}>
//         <Pie data={data01} dataKey="value" cx={100} cy={100} outerRadius={60} fill="#8884d8" />
//         <Pie data={data02} dataKey="value" cx={100} cy={100} innerRadius={70} outerRadius={90} fill="#82ca9d" label />
//       </PieChart>
//     );
//   }
// }
