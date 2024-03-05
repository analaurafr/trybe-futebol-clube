import MatchModel from '../models/MatchModel';
import TeamModel from '../models/TeamModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import {
  goalsFavorHome,
  goalsOwnHome,
  totalDrawsHome,
  totalGamesHome,
  totalLosesHome,
  goalsBalanceHome,
  totalPointsHome,
  efficiencyHome,
  totalVictoriesHome,
  sortTeams,
  totalPointsAway,
  totalVictoriesAway,
  totalDrawsAway,
  totalLosesAway,
  goalsFavorAway,
  goalsOwnAway,
  goalsBalanceAway,
  efficiencyAway,
  totalGamesAway,
  efficiencyTotal,
  totalPointsAll,
} from '../utils/leadfuncs';
import { LeaderboardType } from '../Interfaces/matches/IMatch';

export default class LeaderboardService {
  constructor(
    private matchModel = new MatchModel(),
    private teamModel = new TeamModel(),
  ) {}

  async getAllLeaderHome(): Promise<ServiceResponse<LeaderboardType[]>> {
    const teams = await this.teamModel.findAll();
    const matches = await this.matchModel.findMatchsFiltred('false');

    const homeMatches = teams.map((team) => ({
      name: team.teamName,
      totalPoints: totalPointsHome(team.id, matches),
      totalGames: totalGamesHome(team.id, matches),
      totalVictories: totalVictoriesHome(team.id, matches),
      totalDraws: totalDrawsHome(team.id, matches),
      totalLosses: totalLosesHome(team.id, matches),
      goalsFavor: goalsFavorHome(team.id, matches),
      goalsOwn: goalsOwnHome(team.id, matches),
      goalsBalance: goalsBalanceHome(team.id, matches),
      efficiency: efficiencyHome(team.id, matches),
    }));

    sortTeams(homeMatches);

    return { status: 'SUCCESSFUL', data: homeMatches };
  }

  async getAllLeaderAway(): Promise<ServiceResponse<LeaderboardType[]>> {
    const teams = await this.teamModel.findAll();
    const matches = await this.matchModel.findMatchsFiltred('false');
    const awayMatches = teams.map((team) => ({
      name: team.teamName,
      totalPoints: totalPointsAway(team.id, matches),
      totalGames: totalGamesAway(team.id, matches),
      totalVictories: totalVictoriesAway(team.id, matches),
      totalDraws: totalDrawsAway(team.id, matches),
      totalLosses: totalLosesAway(team.id, matches),
      goalsFavor: goalsFavorAway(team.id, matches),
      goalsOwn: goalsOwnAway(team.id, matches),
      goalsBalance: goalsBalanceAway(team.id, matches),
      efficiency: efficiencyAway(team.id, matches),
    }));
    sortTeams(awayMatches);
    return { status: 'SUCCESSFUL', data: awayMatches };
  }

  async getAllLeaderbord(): Promise<ServiceResponse<LeaderboardType[]>> {
    const teams = await this.teamModel.findAll();
    const matches = await this.matchModel.findMatchsFiltred('false');
    const allMatches = teams.map((team) => ({
      name: team.teamName,
      totalPoints: totalPointsAll(team.id, matches),
      totalGames: totalGamesAway(team.id, matches) + totalGamesHome(team.id, matches),
      totalVictories: totalVictoriesAway(team.id, matches) + totalVictoriesHome(team.id, matches),
      totalDraws: totalDrawsAway(team.id, matches) + totalDrawsHome(team.id, matches),
      totalLosses: totalLosesAway(team.id, matches) + totalLosesHome(team.id, matches),
      goalsFavor: goalsFavorAway(team.id, matches) + goalsFavorHome(team.id, matches),
      goalsOwn: goalsOwnAway(team.id, matches) + goalsOwnHome(team.id, matches),
      goalsBalance: goalsBalanceAway(team.id, matches) + goalsBalanceHome(team.id, matches),
      efficiency: efficiencyTotal(team.id, matches),
    }));
    sortTeams(allMatches);

    return { status: 'SUCCESSFUL', data: allMatches };
  }
}
