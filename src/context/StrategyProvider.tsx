import React, {ReactNode} from "react";
import StrategyContext from "./StrategyContext.tsx";
import {StrategyComponent} from "../features/gameLogic/StrategyComponent.tsx";
import {Repository} from "../utils/Repository.tsx";
import {ConcreteTriviaStrategy} from "../features/gameLogic/StrategyComponent.tsx";

interface StrategyProviderProps{
    children: ReactNode;
}

const StrategyProvider: React.FC<StrategyProviderProps> = ({ children }) => {
    const repository = new Repository();
    const concreteStrategy = new ConcreteTriviaStrategy();
    const strategy = new StrategyComponent(repository, concreteStrategy);

    return (
        <StrategyContext.Provider value={strategy}>
            {children}
        </StrategyContext.Provider>
    );
};

export default StrategyProvider