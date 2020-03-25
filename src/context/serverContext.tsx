import { createContext } from "react";
import { server } from "../model/server";

export const serverContext = createContext(new server());
