
import { Test1, Test1Child1, Test1Child1Child1 } from '../../test-types';
import { _registerModelStateConfig } from '../model-state-config-helpers';
import { _deleteModel } from './delete-model.helper';

interface TestState  { 
    test1s: Test1[], test1Child1s: Test1Child1[], test1Child1Child1s: Test1Child1Child1[],
}

var entityId: string = 'testid123';
var entityId2: string = "testid12345"

function getTestState(): any{ 
  return {
    test1s: [ 
      {id: entityId}, 
      {id: entityId2} 
    ],
    test1Child1s: [ 
      { id: 'testchild1', test1Id: entityId }, 
      { id: 'testchild2', test1Id: entityId },
      { id: 'testchild3', test1Id: entityId2 },
      { id: 'testchild4', test1Id: entityId2 },
      { id: 'nomatch' },
    ],
    test1Child1Child1s: [
      {id: 'childchild1', test1Child1Id: 'testchild1'}, 
      {id: 'childchild2', test1Child1Id: 'testchild1'}, 
      {id: 'childchild3', test1Child1Id: 'testchild2'},
      {id: 'childchild4', test1Child1Id: 'testchild2'},
      {id: 'childchild5', test1Child1Id: 'testchild3'},
      {id: 'childchild6', test1Child1Id: 'testchild3'}, 
      {id: 'childchild7', test1Child1Id: 'testchild4'},
      {id: 'childchild8', test1Child1Id: 'testchild4'},
      {id: 'nomatch'},
    ]
  }
}

function getModelConfigMap(): any{
  return {
    test1s: {
      stateProp: "test1s",
      idProp: "id",
      children: { children: { stateProp: "test1Child1s", childKey: "test1Id", cascadeDelete: true} },
      foreigns: { }
    },
    test1Child1s: {
        stateProp: "test1Child1s",
        idProp: "id",
        children: { children: { stateProp: "test1Child1Child1s", childKey: "test1Child1Id", cascadeDelete: true} }, 
        foreigns: { }
    }, 
    test1Child1Child1s: {
        stateProp: "test1Child1Child1s",
        idProp: "id",
        children: {}, foreigns: {}
    }, 
  }
}

describe('_deleteModel', () => {

  beforeEach(() => {});

  it('should delete single model & cascading children 2 levels deep', () => {
    _registerModelStateConfig<TestState>(getModelConfigMap());
    var result = _deleteModel<Partial<TestState>, Test1>(getTestState(), "test1s", {id: entityId})

    expect(result.test1s?.length).toBe(1);
    expect(result.test1Child1s?.length).toBe(3);
    expect(result.test1Child1Child1s?.length).toBe(5);
  });

  it('should delete single model & not delete children with cascadeDelete false', () => {
    const map = getModelConfigMap();
    (<any> map.test1s.children.children).cascadeDelete = false;
    _registerModelStateConfig<TestState>(map);
    var result = _deleteModel<Partial<TestState>, Test1>(getTestState(), "test1s", {id: entityId})

    expect(result.test1s?.length).toBe(1);
    expect(result.test1Child1s).toBe(undefined);
    expect(result.test1Child1Child1s).toBe(undefined);
  });

  it('should delete multiple models & cascading children 2 levels deep', () => {
    _registerModelStateConfig<TestState>(getModelConfigMap());
    var result = _deleteModel<Partial<TestState>, Test1>(getTestState(), "test1s", {ids: [entityId, entityId2]})

    expect(result.test1s?.length).toBe(0);
    expect(result.test1Child1s?.length).toBe(1);
    expect(result.test1Child1Child1s?.length).toBe(1);
  });

  it('should delete multiple models & not delete children with cascadeDelete false', () => {
    const map = getModelConfigMap();
    (<any> map.test1s.children.children).cascadeDelete = false;
    _registerModelStateConfig<TestState>(map);
    var result = _deleteModel<Partial<TestState>, Test1>(getTestState(), "test1s", {ids: [entityId, entityId2]})

    expect(result.test1s?.length).toBe(0);
    expect(result.test1Child1s?.length).toBe(undefined);
    expect(result.test1Child1Child1s?.length).toBe(undefined);
  });

  it('should delete nothing when no ids are given', () => {
    _registerModelStateConfig<TestState>(getModelConfigMap());
    var result = _deleteModel<Partial<TestState>, Test1>(getTestState(), "test1s", {})

    expect(result.test1s?.length).toBe(undefined);
    expect(result.test1Child1s?.length).toBe(undefined);
    expect(result.test1Child1Child1s?.length).toBe(undefined);
  });

  it('should delete nothing when id is not found', () => {
    _registerModelStateConfig<TestState>(getModelConfigMap());
    var result = _deleteModel<Partial<TestState>, Test1>(getTestState(), "test1s", {id: 'notfound'})

    expect(result.test1s?.length).toBe(undefined);
    expect(result.test1Child1s?.length).toBe(undefined);
    expect(result.test1Child1Child1s?.length).toBe(undefined);
  });
});
