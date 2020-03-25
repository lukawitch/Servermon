import React from "react";
import TopNavBar from "./topNavBar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./home";
import ServerList from "./server/serverList";
import ServerSummary from "./server/hostSummary/serverHostSummary";
import ServerMemory from "./server/Memory/serverMemory";
import ServerDisk from "./server/Storage/serverStoarge";
import ServerIssue from "./server/issue/serverIssue";
import Email from "./email/email";
import HostSetting from "./host/hostSetting";
import Ping from "./ping/ping";
import Report from "./report/report";
const body = () => {
  return (
    <div>
      <Router>
        <TopNavBar />
        <Route exact path="/" component={Home} />
        <Switch>
          <Route exact path="/serverlist" component={ServerList} />
          <Route exact path="/serversummary" component={ServerSummary} />
          <Route exact path="/servermemory" component={ServerMemory} />
          <Route exact path="/serverstorage" component={ServerDisk} />
          <Route exact path="/serverissue" component={ServerIssue} />
          <Route exact path="/email" component={Email} />
          <Route exact path="/hostsetting" component={HostSetting} />
          <Route exact path="/ping" component={Ping} />
          <Route exact path="/report" component={Report} />
        </Switch>
      </Router>
    </div>
  );
};

export default body;
