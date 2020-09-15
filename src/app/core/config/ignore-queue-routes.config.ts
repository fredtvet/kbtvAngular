import { ApiUrl } from '../api-url.enum';

export const IgnoreQueueCommands: {[key: string]: boolean} = {}
IgnoreQueueCommands[`${ApiUrl.Auth}/changePassword`] = true;
IgnoreQueueCommands[`${ApiUrl.Auth}/refresh`] = true;
IgnoreQueueCommands[`${ApiUrl.Auth}/login`] = true;
IgnoreQueueCommands[`${ApiUrl.MissionDocument}/SendDocuments`] = true;
IgnoreQueueCommands[`${ApiUrl.MissionImage}/SendImages`] = true;
//Husk header imagew