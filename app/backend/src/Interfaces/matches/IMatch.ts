export interface IMatch {
  id: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  homeTeamId: number;
  inProgress: boolean;
}

export interface IMatchReq {
  homeTeamGoals: number;
  awayTeamGoals: number;
  awayTeamId: number;
  homeTeamId: number;
}
