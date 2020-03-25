import { createContext } from "react";
import { ping } from "../model/ping";

export const pingContext = createContext(new ping());
