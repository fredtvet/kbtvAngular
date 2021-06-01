
import { Test1, Test1Child1, Test1Child1Child1, Test1Child1Foreign1, Test1Child1Foreign1Child1, Test1Foreign1, Test1Foreign1Child1 } from '../../test-types';
import { ModelConfigMap } from '../interfaces';
import { _registerModelStateConfig } from '../model-state-config-helpers';
import { _saveModel } from './save-model.helper';

interface TestState  { 
  test1s: Test1[], 
  test1Foreign1s: Test1Foreign1[], test1Foreign1Child1s: Test1Foreign1Child1[], 
  test1Child1s: Test1Child1[], test1Child1Child1s: Test1Child1Child1[],
  test1Child1Foreign1s: Test1Child1Foreign1[],
  test1Child1Foreign1Child1s: Test1Child1Foreign1Child1[]
}
const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const charLength = chars.length;
function _idGenerator(length: number = 7): any{
    // return counter++;
    let id = '';
    for ( var i = 0; i < length; i++ ) {
        id += chars.charAt(Math.floor(Math.random() * charLength));
    }
    return id;
}

const newModelFullNestedWithIds: Test1 = { id: "model", test1: 'test1',
  foreign: { id: "modelForeign", test2: 'test2', children: [
    { id: "modelForeignChild1"}, { id: "modelForeignChild2" }
  ]}, 
  children: [
    { id: "modelChild1", test2: "test2", children: [ { id: "modelChild1Child1" } ], 
      foreign1: { id: "modelChild1Foreign",
        test1Child1Foreign1Child1s: [ { id: "modelChild1ForeignChild1", } ] 
      } 
    },
    { id: "modelChild2", children: [ { id: "modelChild2Child1" } ], 
    foreign1: { id: "modelChild2Foreign",
      test1Child1Foreign1Child1s: [ { id: "modelChild2ForeignChild1", } ] 
    } 
  },
  ]
}
const newModelFullNestedNoIds: Test1 = { 
  foreign: { children: [
    {}, {}
  ]}, 
  children: [
    { children: [ {} ], 
      foreign1: { 
        test1Child1Foreign1Child1s: [ {} ] 
      } 
    },
    { children: [ {} ], 
      foreign1: { 
        test1Child1Foreign1Child1s: [ {} ] 
      } 
    },
  ]
}

function getModelConfigMap(idGenerator?: typeof _idGenerator): ModelConfigMap<TestState>{
  return {
    test1s: {
      stateProp: "test1s",
      idProp: "id",
      idGenerator,
      children: { children: { stateProp: "test1Child1s", childKey: "test1Id" } },
      foreigns: { foreign: { stateProp: "test1Foreign1s", foreignKey: "foreignKey" } }
    },
    test1Foreign1s: {
      stateProp: "test1Foreign1s",
      idProp: "id",
      idGenerator,
      children: { 
        children: { stateProp: "test1Foreign1Child1s", childKey: "test1Foreign1Id" },
        test1s: { stateProp: "test1s", childKey: "foreignKey" }
      },
      foreigns: {}
    },
    test1Foreign1Child1s: {
      stateProp: "test1Foreign1Child1s",
      idProp: "id",
      idGenerator,
      children: { }, 
      foreigns: { foreign1: {stateProp: "test1Foreign1s", foreignKey: "test1Foreign1Id"}}
    },
    test1Child1s: {
        stateProp: "test1Child1s",
        idProp: "id",
        idGenerator,
        children: { children: { stateProp: "test1Child1Child1s", childKey: "test1Child1Id", cascadeDelete: true} }, 
        foreigns: { foreign1: {stateProp: "test1Child1Foreign1s", foreignKey: "foreignKey1"}}
    }, 
    test1Child1Child1s: {
        stateProp: "test1Child1Child1s",
        idProp: "id",
        idGenerator,
        children: {}, foreigns: {}
    }, 
    test1Child1Foreign1s: {
      stateProp: "test1Child1Foreign1s",
      idProp: "id",
      idGenerator,
      children: { 
        test1Child1s: { stateProp: "test1Child1s", childKey: "foreignKey1" },
        test1Child1Foreign1Child1s: {stateProp: "test1Child1Foreign1Child1s", childKey: "foreignKey1"}
      }, foreigns: {}
    },
    test1Child1Foreign1Child1s: {
      stateProp: "test1Child1Foreign1Child1s",
      idProp: "id",
      idGenerator,
      children: {}, foreigns: { foreign1: {stateProp: "test1Child1Foreign1s", foreignKey: "foreignKey1"}}
    }
  }
}

function assertFullNestedState(x: any){
  expect(x.test1s?.[0].id).toBeDefined();
  expect(x.test1s?.[0].foreignKey).toEqual(x.test1Foreign1s?.[0].id);
  expect(x.test1s?.[0].foreign).toBeNull();
  expect(x.test1s?.[0].children).toBeFalsy();

  expect(x.test1Foreign1s?.[0].id).toBeDefined();
  expect(x.test1Foreign1s?.[0].children).toBeFalsy();

  expect(x.test1Foreign1Child1s?.[0].id).toBeDefined();
  expect(x.test1Foreign1Child1s?.[0].test1Foreign1Id).toEqual(x.test1Foreign1s?.[0].id);
  expect(x.test1Foreign1Child1s?.[1].id).toBeDefined();
  expect(x.test1Foreign1Child1s?.[1].test1Foreign1Id).toEqual(x.test1Foreign1s?.[0].id);

  expect(x.test1Child1Foreign1s?.[0].id).toBeDefined();
  expect(x.test1Child1Foreign1s?.[0].test1Child1s).toBeFalsy();
  expect(x.test1Child1Foreign1s?.[1].id).toBeDefined();
  expect(x.test1Child1Foreign1s?.[1].test1Child1s).toBeFalsy();
  
  expect(x.test1Child1Foreign1Child1s?.[0].id).toBeDefined();
  expect(x.test1Child1Foreign1Child1s?.[0].foreignKey1).toEqual(x.test1Child1Foreign1s?.[0].id);
  expect(x.test1Child1Foreign1Child1s?.[1].id).toBeDefined();
  expect(x.test1Child1Foreign1Child1s?.[1].foreignKey1).toEqual(x.test1Child1Foreign1s?.[1].id);

  expect(x.test1Child1s?.[0].id).toBeDefined();
  expect(x.test1Child1s?.[0].test1Id).toEqual(x.test1s?.[0].id);
  expect(x.test1Child1s?.[0].foreignKey1).toEqual(x.test1Child1Foreign1s?.[0].id);
  expect(x.test1Child1s?.[1].id).toBeDefined();
  expect(x.test1Child1s?.[1].test1Id).toEqual(x.test1s?.[0].id);
  expect(x.test1Child1s?.[1].foreignKey1).toEqual(x.test1Child1Foreign1s?.[1].id);

  expect(x.test1Child1Child1s?.[0].id).toBeDefined();
  expect(x.test1Child1Child1s?.[0].test1Child1Id).toEqual(x.test1Child1s?.[0].id);
  expect(x.test1Child1Child1s?.[1].id).toBeDefined();
  expect(x.test1Child1Child1s?.[1].test1Child1Id).toEqual(x.test1Child1s?.[1].id);
}

function assetFullNestedModelIds(x: any){
  expect(x.id).toBeDefined();

  expect(x.foreign!.id).toBeDefined();

  expect(x.foreign!.children?.[0].id).toBeDefined();
  expect(x.foreign!.children?.[1].id).toBeDefined();

  expect(x.children?.[0].id).toBeDefined();
  expect(x.children?.[1].id).toBeDefined();

  expect(x.children?.[0].foreign1!.id).toBeDefined();
  expect(x.children?.[1].foreign1!.id).toBeDefined();

  expect(x.children?.[0].foreign1!.test1Child1Foreign1Child1s?.[0].id).toBeDefined();
  expect(x.children?.[1].foreign1!.test1Child1Foreign1Child1s?.[0].id).toBeDefined();;

  expect(x.children?.[0].children?.[0].id).toBeDefined();
  expect(x.children?.[1].children?.[0].id).toBeDefined();
}

describe('_saveModel', () => {

  beforeEach(() => {});

  it('should return modified state with new entity, nested foreigns and children using id generator & no ids', () => {
    _registerModelStateConfig<TestState>(getModelConfigMap(_idGenerator));

    var result = _saveModel<Partial<TestState>, Test1>({}, "test1s", newModelFullNestedNoIds)
    assertFullNestedState(result.modifiedState)
  });

  it('should return modified state with new entity, nested foreigns and children without id generator & with ids', () => {
    _registerModelStateConfig<TestState>(getModelConfigMap());

    var result = _saveModel<Partial<TestState>, Test1>({}, "test1s", newModelFullNestedWithIds)
    assertFullNestedState(result.modifiedState)
  });

  it('should return new entity with new nested foreigns and children using id generator & no ids', () => {
    _registerModelStateConfig<TestState>(getModelConfigMap(_idGenerator));

    var result = _saveModel<Partial<TestState>, Test1>({}, "test1s", newModelFullNestedNoIds)
    assetFullNestedModelIds(result.fullModel)
  });

  it('should return entity with new nested foreigns and children without id generator & with ids', () => {
    _registerModelStateConfig<TestState>(getModelConfigMap());

    var result = _saveModel<Partial<TestState>, Test1>({}, "test1s", newModelFullNestedWithIds)
    assetFullNestedModelIds(result.fullModel)
  });

  it('should return modified state with with updated entity, foreign and child', () => {
    _registerModelStateConfig<TestState>(getModelConfigMap());
    const existingModel = {id: "model", test1: "override", test2: "same"};
    const existingForeign = {id: "modelForeign", test1: "same", test2: "override"};
    const existingChild = {id: "modelChild1", test1: "same", test2: "override"};
    const state = { test1s: [existingModel], test1Foreign1s: [existingForeign], test1Child1s: [existingChild] };
    var result = _saveModel<Partial<TestState>, Test1>(state, "test1s", newModelFullNestedWithIds)
    const x = result.modifiedState;
    expect(x.test1s?.[0].test1).toEqual(newModelFullNestedWithIds.test1);
    expect(x.test1s?.[0].test2).toEqual(existingModel.test2);
    expect(x.test1Foreign1s?.[0].test1).toEqual(existingForeign.test1);
    expect(x.test1Foreign1s?.[0].test2).toEqual(newModelFullNestedWithIds.foreign!.test2);
    expect(x.test1Child1s?.[1].test1).toEqual(existingChild.test1);
    expect(x.test1Child1s?.[1].test2).toEqual(newModelFullNestedWithIds.children![0]!.test2);
  });

  it('should throw error without id generator and no ids', () => {
    _registerModelStateConfig<TestState>(getModelConfigMap());
    expect( function(){ _saveModel<Partial<TestState>, Test1>({}, "test1s", newModelFullNestedNoIds) } ).toThrow()
  });

});
