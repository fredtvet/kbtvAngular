import { User } from 'src/app/core/models';
import { UserForeign } from 'src/app/core/models/relationships/user-foreign.interface';
import { _convertArrayToObject } from './array/convert-array-to-object.helper';

export function _setFullNameOnUserForeigns<TEntity extends UserForeign>(
    entities: TEntity[],
    users: User[]
  ): TEntity[] {

    if (!entities || !users) return entities;

    let usersObj = _convertArrayToObject(users, "userName");

    for(let i = 0; i < entities.length; i++){
      let entity = entities[i];
      const user = usersObj[entity.userName];
      if (user) entity.fullName = user.firstName + " " + user.lastName;
    }

    return entities;
  }