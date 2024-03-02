import MatchModel from '../models/MatchModel';
import TeamsModel from '../models/TeamModel';
import { getTotalDraws, getTotalGames, getGoalsFavor, getGoalsOwn,
  getTotalLosses, getTotalPoints, getTotalVictories, getEfficiency,
  getGoalsBalance, getTeamsByOrder, getTotalVictoriesA,
  getTotalDrawsA,
  getTotalPointsA,
  getTotalLossesA,
  getGoalsFavorA,
  getGoalsOwnA,
  getTotalGamesA,
  getGoalsBalanceA,
  getEfficiencyA,
} from '../utils/leaderboardUtils';

export default class LeaderboardService {
  constructor(
    private matchModel = new MatchModel(),
    private teamModel = new TeamsModel(),
  ) {}

  public async getHomeTeam() {
    const allTeams = await this.teamModel.findAll();
    const allMatches = await this.matchModel.findByProgress(false);
    const leaderboard = allTeams.map((team) => ({
      name: team.teamName,
      totalPoints: getTotalPoints(team.id, allMatches),
      totalGames: getTotalGames(team.id, allMatches),
      totalVictories: getTotalVictories(team.id, allMatches),
      totalDraws: getTotalDraws(team.id, allMatches),
      totalLosses: getTotalLosses(team.id, allMatches),
      goalsFavor: getGoalsFavor(team.id, allMatches),
      goalsOwn: getGoalsOwn(team.id, allMatches),
      goalsBalance: getGoalsBalance(team.id, allMatches),
      efficiency: getEfficiency(team.id, allMatches),
    }));
    getTeamsByOrder(leaderboard);
    return { status: 'SUCCESSFUL', data: leaderboard };
  }

  public async getAwayTeam() {
    const allTeams = await this.teamModel.findAll();
    const allMatches = await this.matchModel.findByProgress(false);
    const leaderboard = allTeams.map((team) => ({
      name: team.teamName,
      totalPoints: getTotalPointsA(team.id, allMatches),
      totalGames: getTotalGamesA(team.id, allMatches),
      totalVictories: getTotalVictoriesA(team.id, allMatches),
      totalDraws: getTotalDrawsA(team.id, allMatches),
      totalLosses: getTotalLossesA(team.id, allMatches),
      goalsFavor: getGoalsFavorA(team.id, allMatches),
      goalsOwn: getGoalsOwnA(team.id, allMatches),
      goalsBalance: getGoalsBalanceA(team.id, allMatches),
      efficiency: getEfficiencyA(team.id, allMatches),
    }));
    getTeamsByOrder(leaderboard);
    return { status: 'SUCCESSFUL', data: leaderboard };
  }
}
