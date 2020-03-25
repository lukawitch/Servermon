import React, { useContext, useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { hostContext } from "../../../context/hostContext";
import { serverContext } from "../../../context/serverContext";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";

const serverHostSummaryMemory = observer(
  ({ colorNow }: { colorNow: Array<string> }) => {
    const host = useContext(hostContext);
    const memory = useContext(serverContext);
    const [nowMemory, setNowMemory] = useState(memory.memoryNowInfo);
    const [nowColor, setNowColor] = useState(colorNow);
    const tempColor: Array<string> = [];
    useEffect(() => {
      if (memory.memoryPercent[host.serverListNum] > 80) {
        nowColor.splice(0, nowColor.length);
        tempColor.push("#fe4365");
        tempColor.push("#dddddd");
      }
      memory.getMemoryPercent(host.serverList[host.serverListNum].ip);
      const interval = setInterval(() => {
        memory.getMemoryPercent(host.serverList[host.serverListNum].ip);
        const tempValue = memory.memoryNowInfo;
        setNowMemory(tempValue);
        if (memory.memoryNowInfo > 80) {
          nowColor.splice(0, nowColor.length);
          tempColor.push("#fe4365");
          tempColor.push("#dddddd");
          setNowColor(tempColor);
        } else {
          nowColor.splice(0, nowColor.length);
          tempColor.push("#67D5B5");
          tempColor.push("#dddddd");
          setNowColor(tempColor);
        }
      }, 10 * 1000);
      return () => {
        clearInterval(interval);
      };
      // eslint-disable-next-line
    }, []);

    return (
      <div>
        {nowMemory > 100 ? (
          <HighchartsReact
            highcharts={Highcharts}
            options={{
              colors: nowColor,

              title: {
                text: memory.memoryPercent[host.serverListNum].toString() + "%",
                align: "center",
                verticalAlign: "middle",
                style: {
                  fontSize: "20pt"
                }
              },

              series: [
                {
                  type: "pie",
                  name: "Memory",
                  data: [
                    {
                      name: "사용량",
                      y: memory.memoryPercent[host.serverListNum]
                    },
                    {
                      name: "남은량",
                      y: 100 - memory.memoryPercent[host.serverListNum]
                    }
                  ]
                }
              ],
              plotOptions: {
                pie: {
                  allowPointSelect: true,

                  cursor: "pointer",

                  dataLabels: {
                    enabled: false
                  },

                  showInLegend: true,

                  innerSize: 140
                }
              }
            }}
          />
        ) : (
          <HighchartsReact
            highcharts={Highcharts}
            options={{
              colors: nowColor,

              title: {
                text: memory.memoryNowInfo.toString() + "%",
                align: "center",
                verticalAlign: "middle",
                style: {
                  fontSize: "20pt"
                }
              },

              series: [
                {
                  type: "pie",
                  name: "사용량",
                  data: [memory.memoryNowInfo, 100 - memory.memoryNowInfo]
                }
              ],
              plotOptions: {
                pie: {
                  allowPointSelect: true,

                  cursor: "pointer",

                  dataLabels: {
                    enabled: false
                  },

                  showInLegend: true,

                  innerSize: 140
                }
              }
            }}
          />
        )}
      </div>
    );
  }
);

export default serverHostSummaryMemory;
