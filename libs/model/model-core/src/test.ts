import { _add } from "array-helpers";
import { ExtractedModelState, ModelConfigMap } from "./lib/interfaces";

interface Test1 { id: string, Test1: string, foreignKey?: string, foreign:Test1Foreign1, children: Test1Child1[] }

interface Test1Foreign1 { id: string, Test1Foreign1: string, children: Test1Foreign1Child1[] }

interface Test1Child1 {id: string, Test1Child1: string, test1Id?: string }

interface Test1Foreign1Child1 { id: string, Test1Foreign1Child1: string, foreignKey?: string, foreign: Test1Foreign1Child1Foreign1, test1Foreign1Id?: string }

interface Test1Foreign1Child1Foreign1 { id: string, Test1Foreign1Child1Foreign1: string, children: Test1Foreign1Child1Foreign1Child1[] }

interface Test1Foreign1Child1Foreign1Child1 { id: string, Test1Foreign1Child1Foreign1Child1: string, test1Foreign1Child1Foreign1Id?: string }

interface TestState { 
    test1s: Test1[], test1Foreign1s: Test1Foreign1[], test1Child1s: Test1Child1[],
    test1Foreign1Child1s: Test1Foreign1Child1[], test1Foreign1Child1Foreign1s: Test1Foreign1Child1Foreign1[],
    test1Foreign1Child1Foreign1Child1s: Test1Foreign1Child1Foreign1Child1[]
}
const modelConfigMap: ModelConfigMap<TestState> = {
    test1s: {
        stateProp: "test1s",
        idProp: "id",
        children: { children: { stateProp: "test1Child1s", childKey: "test1Id", cascadeDelete: true}},
        foreigns: { foreign: {stateProp: "test1Foreign1s", foreignKey: "foreignKey"}}
    },
    test1Foreign1s: {
        stateProp: "test1Foreign1s",
        idProp: "id",
        children: { children: { stateProp: "test1Foreign1Child1s", childKey: "test1Foreign1Id", cascadeDelete: true}},
        foreigns: {}
    },
    test1Child1s: {
        stateProp: "test1Child1s",
        idProp: "id",
        children: {}, foreigns: {}
    },
    test1Foreign1Child1s: {
        stateProp: "test1Foreign1Child1s",
        idProp: "id",
        children: { },
        foreigns: { foreign: {stateProp: "test1Foreign1Child1Foreign1s", foreignKey: "foreignKey"}}
    },
    test1Foreign1Child1Foreign1s: {
        stateProp: "test1Foreign1Child1Foreign1s",
        idProp: "id",
        children: { children: { stateProp: "test1Foreign1Child1Foreign1Child1s", childKey: "test1Foreign1Child1Foreign1Id", cascadeDelete: true}},
        foreigns: {}
    },
    test1Foreign1Child1Foreign1Child1s: {
        stateProp: "test1Foreign1Child1Foreign1Child1s",
        idProp: "id",
        children: {},
        foreigns: {}
    },

}

type testss = ExtractedModelState<TestState>
const state = <TestState> {};

const newModel: Test1 = {
    id: 'Test1', Test1: 'adsada', 
    children: [{id: 'Test1Ch1', Test1Child1: 'DASDAS' },{id: 'Test1Ch2', Test1Child1: 'DASDAS' },{id: 'Test1Ch3', Test1Child1: 'DASDAS' }],
    foreign: {
        id: "Test1Fk1", Test1Foreign1: "asdad",
        children: [
            { id: "Test1Fk1Ch1", Test1Foreign1Child1: "asda", foreign: {
                id: "Test1Fk1Ch1Fk1", Test1Foreign1Child1Foreign1: 'asda', children: [
                    {id: "Test1Fk1Ch1Fk1Ch1", Test1Foreign1Child1Foreign1Child1: 'asdad'},
                    {id: "Test1Fk1Ch1Fk1Ch2", Test1Foreign1Child1Foreign1Child1: 'asdad'},
                    {id: "Test1Fk1Ch1Fk1Ch3", Test1Foreign1Child1Foreign1Child1: 'asdad'}
                ]
            }},
            { id: "Test1Fk1Ch2", Test1Foreign1Child1: "asda2", foreign: {
                id: "Test1Fk1Ch2Fk1", Test1Foreign1Child1Foreign1: 'asda', children: [
                    {id: "Test1Fk1Ch2Fk1Ch1", Test1Foreign1Child1Foreign1Child1: 'asdad'},
                    {id: "Test1Fk1Ch2Fk1Ch2", Test1Foreign1Child1Foreign1Child1: 'asdad'},
                    {id: "Test1Fk1Ch2Fk1Ch3", Test1Foreign1Child1Foreign1Child1: 'asdad'}
                ]
            }},
            { id: "Test1Fk1Ch3", Test1Foreign1Child1: "asda3", foreign: {
                id: "Test1Fk1Ch3Fk1", Test1Foreign1Child1Foreign1: 'asda', children: [
                    {id: "Test1Fk1Ch3Fk1Ch1", Test1Foreign1Child1Foreign1Child1: 'asdad'},
                    {id: "Test1Fk1Ch3Fk1Ch2", Test1Foreign1Child1Foreign1Child1: 'asdad'},
                    {id: "Test1Fk1Ch3Fk1Ch3", Test1Foreign1Child1Foreign1Child1: 'asdad'}
                ]
            }}
        ]
    }
}

/**
 * Forventet resultat: 
 *  1x Test1
 *  3x Test1Child1
 *  1x Test1Foreign1
 *  3x Test1Foreign1Child1
 *  3x Test1Foreign1Child1Foreign1
 *  9x Test1Foreign1Child1Foreign1Child1
 */
