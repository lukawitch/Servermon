import { createContext } from "react";
import { report } from "../model/report";

export const reportContext = createContext(new report());
