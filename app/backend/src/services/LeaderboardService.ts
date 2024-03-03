import ILeaderboard from '../Interfaces/leaderboard/ILeaderboard';
import { TeamType } from '../utils/leaderboardUtils';
import { IMatch } from '../Interfaces/matches/IMatch';
import { ITeam } from '../Interfaces/teams/ITeam';
import TeamModel from '../models/TeamModel';
import MatchModel from '../models/MatchModel';

export default class LeaderboardService {
  constructor(
    private teamModel = new TeamModel(),
    private matchModel = new MatchModel(),
  ) { }

  private static getMatches(
    team: ITeam,
    type: TeamType,
    matches: IMatch[],
  ): IMatch[] {
    return matches.filter((match: IMatch) => {
      const { homeTeamId, awayTeamId } = match;
      const id = match[`${type}TeamId` as keyof IMatch];

      return (
        type === 'both' && (homeTeamId === team.id || awayTeamId === team.id)
      ) || (id === team.id);
    });
  }

  private static getVictoriesAndLosses(
    matches: IMatch[],
    teamId: number,
    type: 'victories' | 'losses',
  ): number {
    return matches.reduce((a, match: IMatch) => {
      const { homeTeamGoals, awayTeamGoals, homeTeamId } = match;

      const homeGoals = homeTeamId === teamId ? homeTeamGoals : awayTeamGoals;
      const awayGoals = homeTeamId !== teamId ? homeTeamGoals : awayTeamGoals;

      return type === 'victories'
        ? a + (homeGoals > awayGoals ? 1 : 0)
        : a + (homeGoals < awayGoals ? 1 : 0);
    }, 0);
  }

  private static getDraws(matches: IMatch[]): number {
    return matches.filter(
      (match: IMatch) => match.homeTeamGoals === match.awayTeamGoals,
    ).length;
  }

  private static getTotalPt(matches: IMatch[], teamId: number): number {
    const { getVictoriesAndLosses, getDraws } = LeaderboardService;
    const victories = getVictoriesAndLosses(matches, teamId, 'victories');
    const draws = getDraws(matches);
    return victories * 3 + draws;
  }

  private static getGoals(
    matches: IMatch[],
    teamId: number,
    type: 'own' | 'favor',
  ): number {
    return matches.reduce((a, match: IMatch) => {
      const { homeTeamId, homeTeamGoals, awayTeamGoals } = match;

      return type === 'favor'
        ? a + (homeTeamId === teamId ? homeTeamGoals : awayTeamGoals)
        : a + (homeTeamId === teamId ? awayTeamGoals : homeTeamGoals);
    }, 0);
  }

  private static getBalance(matches: IMatch[], teamId: number): number {
    const { getGoals } = LeaderboardService;

    const favorGoals = getGoals(matches, teamId, 'favor');
    const ownGoals = getGoals(matches, teamId, 'own');

    return favorGoals - ownGoals;
  }

  private static getEfficiency(matches: IMatch[], teamId: number): string {
    const { getTotalPt } = LeaderboardService;

    const totalPt = getTotalPt(matches, teamId);

    const totalGames = matches.length;

    const efficiency = (totalPt / (totalGames * 3)) * 100;

    return efficiency.toFixed(2);
  }

  private static setNewTeam(matches: IMatch[], team: ITeam) {
    const {
      getTotalPt, getVictoriesAndLosses,
      getDraws, getGoals,
      getBalance, getEfficiency,
    } = LeaderboardService;

    return {
      name: team.teamName,
      totalPoints: getTotalPt(matches, team.id),
      totalGames: matches.length,
      totalVictories: getVictoriesAndLosses(matches, team.id, 'victories'),
      totalDraws: getDraws(matches),
      totalLosses: getVictoriesAndLosses(matches, team.id, 'losses'),
      goalsFavor: getGoals(matches, team.id, 'favor'),
      goalsOwn: getGoals(matches, team.id, 'own'),
      goalsBalance: getBalance(matches, team.id),
      efficiency: getEfficiency(matches, team.id),
    };
  }

  private static organizeLeaderboard(
    leaderboard: ILeaderboard[],
  ): ILeaderboard[] {
    return leaderboard.sort((x: ILeaderboard, y: ILeaderboard) =>
      y.totalPoints - x.totalPoints
      || y.totalVictories - x.totalVictories
      || y.goalsBalance - x.goalsBalance
      || y.goalsFavor - x.goalsFavor
      || y.goalsOwn - x.goalsOwn);
  }

  public homeLeaderboard = async (typeOfTeam: TeamType): Promise<ILeaderboard[]> => {
    const {
      getMatches,
      setNewTeam,
      organizeLeaderboard,
    } = LeaderboardService;

    const teamlist: ITeam[] = await this.teamModel.findAll();
    const matchList: IMatch[] = await this.matchModel.findByQuery(String(false));

    const leaderboard: ILeaderboard[] = teamlist.map((team: ITeam) => {
      const matches: IMatch[] = getMatches(team, typeOfTeam, matchList);
      return setNewTeam(matches, team);
    });

    return organizeLeaderboard(leaderboard);
  };
}
