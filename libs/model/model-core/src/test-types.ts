export interface Test1 { id?: string, 
    test1?: string, test2?: string, foreignKey?: string, foreign?:Test1Foreign1, children?: Test1Child1[], foreignKey2?: string }

export interface Test1Child1 {id?: string, test1?: string,  test2?: string, test1Id?: string, children?: Test1Child1Child1[], foreign1?:Test1Child1Foreign1, foreign2?: Test1Child1Foreign2, foreignKey1?: string, foreignKey2?: string }

export interface Test1Child1Child1 {id?: string, test1Child1Id?: string }

export interface Test1Child1Foreign1 {id?: string, Test1Child1Foreign1?: String, foreignKey1?: string, test1Child1s?: Test1Child1[], test1Child1Foreign1Child1s?: Test1Child1Foreign1Child1[] }

export interface Test1Child1Foreign2 {id?: string, Test1Child1Foreign2?: string, foreignKey1?: string, test1Child1s?: Test1Child1[] }

export interface Test1Child1Foreign1Child1 {id?: string, Test1Child1Foreign1a?: string, foreign1?: Test1Child1Foreign1, foreignKey1?: string }

export interface Test1Foreign1 { id?: string, test1?: string, test2?: string, children?: Test1Foreign1Child1[], test1s?: Test1[]}

export interface Test1Foreign1Child1 { id?: string, Test1Foreign1Child1?: string, foreignKey?: string, test1Foreign1Id?: string, foreign1?: Test1Foreign1, }

export interface TestState  { 
    test1s: Test1[], test1Foreign1s: Test1Foreign1[], test1Child1s: Test1Child1[], test1Child1Child1s: Test1Child1Child1[],
    test1Foreign1Child1s: Test1Foreign1Child1[], 
    test1Child1Foreign1s: Test1Child1Foreign1[], test1Child1Foreign2s: Test1Child1Foreign2[],
    test1Child1Foreign2Child1s: Test1Child1Foreign1Child1[]
}
