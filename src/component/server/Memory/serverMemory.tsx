import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { hostContext } from "../../../context/hostContext";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import { serverContext } from "../../../context/serverContext";
import { ServerMemoryTitle, ServerMemoryPosition } from "./styled";
import { Redirect } from "react-router";

const serverMemory = observer(() => {
  const host = useContext(hostContext);
  const memory = useContext(serverContext);
  const [value, setValue] = useState(memory.memoryData);
  const [time, setTime] = useState(memory.timeData);

  useEffect(() => {
    if (host.serverList.length !== 0) {
      const interval = setInterval(() => {
        memory
          .getMemoryPercent(host.serverList[host.serverListNum].ip)
          .then(() => {
            setValue(memory.memoryData.slice());
            setTime(memory.timeData.slice());
          });
      }, 10 * 1000);
      return () => {
        clearInterval(interval);
      };
    }

    // eslint-disable-next-line
  }, []);

  return (
    <ServerMemoryPosition>
      {host.serverList.length === 0 ? (
        <>
          <Redirect to="/serverlist" />
        </>
      ) : (
        <>
          <ServerMemoryTitle>Memory사용량</ServerMemoryTitle>
          <HighchartsReact
            highcharts={Highcharts}
            options={{
              title: {
                text: ""
              },

              series: [
                {
                  type: "line",
                  name: "memory",
                  data: value
                }
              ],
              scrollbar: {
                enabled: true,
                barBackgroundColor: "#c9d6de",
                barBorderRadius: 4,
                barBorderWidth: 0,
                buttonBackgroundColor: "#c9d6de",
                buttonBorderWidth: 0,
                buttonArrowColor: "#52616a",
                buttonBorderRadius: 4,
                rifleColor: "#52616a",
                trackBackgroundColor: "white",
                trackBorderWidth: 1,
                trackBorderColor: "silver",
                trackBorderRadius: 4
              },
              xAxis: {
                ordinal: false,
                type: "datetime",
                categories: time
              },
              yAxis: {
                max: 100,
                min: 0,
                title: {
                  text: ""
                }
              }
            }}
          />
        </>
      )}
    </ServerMemoryPosition>
  );
});

export default serverMemory;
