import React, { useContext, useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { hostContext } from "../../../context/hostContext";
import { serverContext } from "../../../context/serverContext";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";

const serverHostSummaryStorage = observer(
  ({ colorNow }: { colorNow: Array<string> }) => {
    const host = useContext(hostContext);
    const storage = useContext(serverContext);
    const [nowStorage, setNowStorage] = useState(storage.storageNowInfo);
    const [nowColor, setNowColor] = useState(colorNow);
    const tempColor: Array<string> = [];
    useEffect(() => {
      if (storage.storagePercent[host.serverListNum] > 80) {
        nowColor.splice(0, nowColor.length);
        tempColor.push("#fe4365");
        tempColor.push("#dddddd");
      }
      if (host.storageDiskName.length !== 0) {
        storage.getstoragePercent(
          host.serverList[host.serverListNum].ip,
          host.storageDiskName[0]
        );
      }
      const interval = setInterval(() => {
        if (host.storageDiskName.length !== 0) {
          storage.getstoragePercent(
            host.serverList[host.serverListNum].ip,
            host.storageDiskName[0]
          );
        }
        let count = 0;
        let tempValue = storage.storageNowInfo + count * 10;
        setNowStorage(tempValue);
        if (tempValue === 888) {
          if (storage.storagePercent[host.serverListNum] > 80) {
            tempColor.splice(0, tempColor.length);
            tempColor.push("#fe4365");
            tempColor.push("#dddddd");
            setNowColor(tempColor.slice());
          } else {
            tempColor.splice(0, tempColor.length);
            tempColor.push("#67D5B5");
            tempColor.push("#dddddd");
            setNowColor(tempColor.slice());
          }
        } else {
          if (tempValue > 80) {
            tempColor.splice(0, tempColor.length);
            tempColor.push("#fe4365");
            tempColor.push("#dddddd");
            setNowColor(tempColor.slice());
          } else {
            tempColor.splice(0, tempColor.length);
            tempColor.push("#67D5B5");
            tempColor.push("#dddddd");
            setNowColor(tempColor.slice());
          }
        }
      }, 10 * 1000);
      return () => {
        clearInterval(interval);
      };
      // eslint-disable-next-line
    }, []);
    return (
      <div>
        {nowStorage > 100 || storage.storageNowInfo.toString() === "" ? (
          <HighchartsReact
            highcharts={Highcharts}
            options={{
              colors: nowColor,

              title: {
                text:
                  storage.storagePercent[host.serverListNum].toString() + "%",
                align: "center",
                verticalAlign: "middle",
                style: {
                  fontSize: "20pt"
                }
              },

              series: [
                {
                  type: "pie",
                  name: "Storage",
                  data: [
                    {
                      name: "사용량",
                      y: storage.storagePercent[host.serverListNum]
                    },

                    {
                      name: "남은량",
                      y: 100 - storage.storagePercent[host.serverListNum]
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
                text: storage.storageNowInfo.toString() + "%",
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
                  data: [
                    {
                      name: "사용량",
                      y: nowStorage
                    },
                    {
                      name: "남은량",
                      y: 100 - nowStorage
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
        )}
      </div>
    );
  }
);

export default serverHostSummaryStorage;
