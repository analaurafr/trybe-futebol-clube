import LeaderboardModel from '../models/LeaderboardModel';
import { ILeaderboardReq, ILeaderboard } from '../Interfaces/leaderboard/ILeaderboard';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class LeaderboardService {
  private leaderboardModel: LeaderboardModel;

  constructor() {
    this.leaderboardModel = new LeaderboardModel();
  }

  public async getHomeTeam(): Promise<ServiceResponse<ILeaderboard[]>> {
    const leaderboardHome = await this.leaderboardModel.findAll();
    const result = leaderboardHome.map((match: ILeaderboardReq) => ({ name: match.teamName,
      totalPoints: (LeaderboardService.victories(match) * 3) + LeaderboardService.draws(match),
      totalGames: match.homeMatch.length,
      totalVictories: LeaderboardService.victories(match),
      totalDraws: LeaderboardService.draws(match),
      totalLosses: LeaderboardService.losses(match),
      goalsFavor: LeaderboardService.favor(match),
      goalsOwn: LeaderboardService.own(match),
      goalsBalance: LeaderboardService.favor(match) - LeaderboardService.own(match),
      efficiency: LeaderboardService.calculateEfficiency(match) }));
    const classification = result.sort((teamA: ILeaderboard, teamB: ILeaderboard) => (
      teamB.totalPoints - teamA.totalPoints
      || teamB.totalVictories - teamA.totalVictories
      || teamB.goalsBalance - teamA.goalsBalance
      || teamB.goalsFavor - teamA.goalsFavor
    ));
    return { status: 'SUCCESSFUL', data: classification };
  }

  private static calculateEfficiency(param: ILeaderboardReq): string {
    const totalPoints = (LeaderboardService.victories(param) * 3) + LeaderboardService.draws(param);
    const efficiency = ((totalPoints / (param.homeMatch.length * 3)) * 100).toFixed(2);
    return efficiency;
  }

  private static countMatches(param: ILeaderboardReq, condition: (item: number) => boolean)
    : number {
    return param.homeMatch.map((scoreBalance) => scoreBalance
      .homeTeamGoals - scoreBalance.awayTeamGoals)
      .filter(condition).length;
  }

  private static calculateGoals(param: ILeaderboardReq, reducer: (acc: number, item: any) => number)
    : number {
    return param.homeMatch.reduce(reducer, 0);
  }

  static victories(param: ILeaderboardReq): number {
    return LeaderboardService.countMatches(param, (item) => item > 0);
  }

  static draws(param: ILeaderboardReq): number {
    return LeaderboardService.countMatches(param, (item) => item === 0);
  }

  static losses(param: ILeaderboardReq): number {
    return LeaderboardService.countMatches(param, (item) => item < 0);
  }

  static favor(param: ILeaderboardReq): number {
    return LeaderboardService.calculateGoals(param, (acc, item) => acc + item.homeTeamGoals);
  }

  static own(param: ILeaderboardReq): number {
    return LeaderboardService.calculateGoals(param, (acc, item) => acc + item.awayTeamGoals);
  }
}
