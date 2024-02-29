import { ICRUDModelReader } from '../ICRUDModel';
import { ILeaderboardAway, ILeaderboardReq } from './ILeaderboard';

export type ILeaderboardModel = ICRUDModelReader<ILeaderboardReq | ILeaderboardAway>;
