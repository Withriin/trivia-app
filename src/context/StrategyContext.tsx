import {createContext} from "react";
import {StrategyComponent} from "../features/gameLogic/StrategyComponent.tsx";


export const StrategyContext = createContext<StrategyComponent | undefined>(undefined);

export default StrategyContext;