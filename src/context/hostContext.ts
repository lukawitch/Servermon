import { createContext } from "react";
import { host } from "../model/host";

export const hostContext = createContext(new host());
