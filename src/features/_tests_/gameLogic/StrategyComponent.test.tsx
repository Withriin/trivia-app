import {TriviaCardListObject} from "../../gameLogic/TriviaCardListObject.tsx";
import {Repository} from "../../../utils/Repository.tsx";
import {ConcreteTriviaStrategy, StrategyComponent} from "../../gameLogic/StrategyComponent.tsx";

describe('StrategyComponent', () =>{
    let strategy = new ConcreteTriviaStrategy();
    let triviaCardListObject = new TriviaCardListObject();
    let repository = new Repository();

    beforeEach( () => {
        let strategyComponent = new StrategyComponent(repository,triviaCardListObject,strategy);
    });

});