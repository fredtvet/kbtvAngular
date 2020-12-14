import { _convertArrayToObject } from '@array/convert-array-to-object.helper';
import { User } from '@core/models';
import { UserForeign } from '@core/models/relationships/user-foreign.interface';
import { Immutable, ImmutableArray } from '@immutable/interfaces';

export function _setFullNameOnUserForeigns<TEntity extends UserForeign>(
    entities: ImmutableArray<TEntity>,
    users: ImmutableArray<User>
  ): Immutable<TEntity>[] {
    const clone = entities?.slice();
    if (!clone || !users) return clone;

    let usersObj = _convertArrayToObject(users, "userName");

    for(let i = 0; i < clone.length; i++){
      const entity = clone[i];
      const user = usersObj[entity.userName];
      if(user) clone[i] = {...entity, fullName: user.firstName + " " + user.lastName};
    }

    return clone;
  }