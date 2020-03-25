import { createContext } from "react";
import { email } from "../model/email";

export const emailContext = createContext(new email());
