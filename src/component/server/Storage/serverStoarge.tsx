import React, { useContext, useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { hostContext } from "../../../context/hostContext";
import Highcharts, {
  SeriesLineOptions,
  SeriesOptionsType
} from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import moment from "moment";
import { serverContext } from "../../../context/serverContext";
import { ServerStorageTitle, ServerStoragePosition } from "./styled";
import { Redirect } from "react-router";

const serverstorage = observer(() => {
  const host = useContext(hostContext);
  const server = useContext(serverContext);
  const [time, setTime] = useState(server.storageTimeData);
  let seriesArray: Array<SeriesOptionsType> = [];
  for (let i = 0; i < server.storageDiskTotal.length; i++) {
    const seriesValue: SeriesLineOptions = {
      type: "line",
      name: "DISK" + i,
      data: server.storageDiskTotal[i]
    };
    seriesArray.push(seriesValue);
  }

  let seriesValue: Highcharts.Options = {
    title: {
      text: ""
    },

    series: seriesArray,
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
    },
    plotOptions: {
      series: {
        cursor: "pointer",
        marker: {
          lineWidth: 1
        }
      }
    },
    tooltip: {
      shared: true
    }
  };

  useEffect(() => {
    if (host.serverList.length !== 0) {
      if (
        host.storageDiskName[0] !== undefined &&
        server.storageDiskTotal.length === 0
      ) {
        server.storageDiskTotal.push([]);
        server.getstoragePercent(
          host.serverList[host.serverListNum].ip,
          host.storageDiskName[0]
        );
        time.push(moment().format("LTS"));
      }
      const interval = setInterval(() => {
        for (let i = 0; i < host.storageDiskName.length; i++) {
          let tempValue;
          if (server.storageDiskTotal[i] === undefined) {
            server.storageDiskTotal.push([]);
          } else {
            if (host.storageDiskName !== undefined) {
              server.getstoragePercent(
                host.serverList[host.serverListNum].ip,
                host.storageDiskName[i]
              );
              tempValue = server.nowInfo;

              server.storageDiskTotal[i].push(tempValue);
              server.storageDiskTotal[i] = server.storageDiskTotal[i].slice();
              time.push(moment().format("LTS"));
              server.storageTimeData = time.slice();
              setTime(server.storageTimeData.slice());
            }
          }
        }
      }, 10000);
      return () => {
        clearInterval(interval);
      };
    }
    // eslint-disable-next-line
  }, []);
  return (
    <ServerStoragePosition>
      {host.serverList.length === 0 ? (
        <>
          <Redirect to="/serverlist" />
        </>
      ) : (
        <>
          {host.serverList[host.serverListNum] === undefined ? (
            <>
              <Redirect to="/" />
            </>
          ) : (
            <>
              <ServerStorageTitle>storage사용량</ServerStorageTitle>

              <HighchartsReact highcharts={Highcharts} options={seriesValue} />
            </>
          )}
        </>
      )}
    </ServerStoragePosition>
  );
});

export default serverstorage;
