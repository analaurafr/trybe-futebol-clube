import { IMatch, LeaderboardType } from '../Interfaces/matches/IMatch';

const totalGamesHome = (teamId: number, matches: IMatch[]): number =>
  matches.filter((match) => teamId === match.homeTeamId).length;

const totalGamesAway = (teamId: number, matches: IMatch[]): number =>
  matches.filter((match) => teamId === match.awayTeamId).length;

const totalVictoriesHome = (teamId: number, matches: IMatch[]): number =>
  matches.filter((match) => match.homeTeamId === teamId
  && match.homeTeamGoals > match.awayTeamGoals).length;

const totalVictoriesAway = (teamId: number, matches: IMatch[]): number =>
  matches.filter((match) => match.awayTeamId === teamId
  && match.awayTeamGoals > match.homeTeamGoals).length;

const totalLosesHome = (teamId: number, matches: IMatch[]): number =>
  matches.filter((match) => match.homeTeamId === teamId
  && match.homeTeamGoals < match.awayTeamGoals).length;

const totalLosesAway = (teamId: number, matches: IMatch[]): number =>
  matches.filter((match) => match.awayTeamId === teamId
  && match.awayTeamGoals < match.homeTeamGoals).length;

const totalDrawsHome = (teamId: number, matches: IMatch[]): number =>
  matches.filter((match) => match.homeTeamId === teamId
  && match.awayTeamGoals === match.homeTeamGoals).length;

const totalDrawsAway = (teamId: number, matches: IMatch[]): number =>
  matches.filter((match) => match.awayTeamId === teamId
  && match.awayTeamGoals === match.homeTeamGoals).length;

const totalPointsHome = (teamId: number, matches: IMatch[]): number => {
  const drawsHome = totalDrawsHome(teamId, matches) * 1;
  const totalVictories = totalVictoriesHome(teamId, matches) * 3;
  return drawsHome + totalVictories;
};

const totalPointsAway = (teamId: number, matches: IMatch[]): number => {
  const drawsAway = totalDrawsAway(teamId, matches) * 1;
  const totalVictories = totalVictoriesAway(teamId, matches) * 3;
  return drawsAway + totalVictories;
};

const goalsFavorHome = (teamId: number, matches: IMatch[]): number =>
  matches.reduce((acc, curr) => acc + (curr.homeTeamId === teamId ? curr.homeTeamGoals : 0), 0);

const goalsFavorAway = (teamId: number, matches: IMatch[]): number =>
  matches.reduce((acc, curr) => acc + (curr.awayTeamId === teamId ? curr.awayTeamGoals : 0), 0);

const goalsOwnHome = (teamId: number, matches: IMatch[]): number =>
  matches.reduce((acc, curr) => acc + (curr.homeTeamId === teamId ? curr.awayTeamGoals : 0), 0);

const goalsOwnAway = (teamId: number, matches: IMatch[]): number =>
  matches.reduce((acc, curr) => acc + (curr.awayTeamId === teamId ? curr.homeTeamGoals : 0), 0);

const goalsBalanceHome = (teamId: number, matches: IMatch[]): number => {
  const golsFavor = goalsFavorHome(teamId, matches);
  const goalsOwn = goalsOwnHome(teamId, matches);
  return golsFavor - goalsOwn;
};

const efficiencyHome = (teamId: number, matches: IMatch[]): string => {
  const P = totalPointsHome(teamId, matches);
  const J = totalGamesHome(teamId, matches);
  const efficiency = ((P / (J * 3)) * 100).toFixed(2);
  return efficiency;
};

const sortTeams = (team: LeaderboardType[]): LeaderboardType[] =>
  team.sort((a, b) => b.totalPoints - a.totalPoints || b.goalsBalance
  - a.goalsBalance || b.goalsFavor - a.goalsFavor);

const goalsBalanceAway = (teamId: number, matches: IMatch[]): number => {
  const goalsFavor = goalsFavorAway(teamId, matches);
  const goalsOwn = goalsOwnAway(teamId, matches);
  return goalsFavor - goalsOwn;
};

const efficiencyAway = (teamId: number, matches: IMatch[]): string => {
  const points = totalPointsAway(teamId, matches);
  const games = totalGamesAway(teamId, matches);
  const efficiency = ((points / (games * 3)) * 100).toFixed(2);
  return efficiency;
};

const totalPointsAll = (teamId: number, matches: IMatch[]): number => {
  const draws = (totalDrawsAway(teamId, matches) + totalDrawsHome(teamId, matches)) * 1;
  const totalVictories = (totalVictoriesHome(teamId, matches)
   + totalVictoriesAway(teamId, matches)) * 3;
  const totalPoints = draws + totalVictories;
  return totalPoints;
};

const efficiencyTotal = (teamId: number, matches: IMatch[]): string => {
  const totalPoints = totalPointsAway(teamId, matches) + totalPointsHome(teamId, matches);
  const totalGames = totalGamesAway(teamId, matches) + totalGamesHome(teamId, matches);
  const efficiency = ((totalPoints / (totalGames * 3)) * 100).toFixed(2);
  return efficiency;
};

export {
  totalGamesHome,
  totalGamesAway,
  totalVictoriesHome,
  totalVictoriesAway,
  totalLosesHome,
  totalLosesAway,
  totalDrawsHome,
  totalDrawsAway,
  totalPointsHome,
  totalPointsAway,
  goalsFavorHome,
  goalsFavorAway,
  goalsOwnHome,
  goalsOwnAway,
  goalsBalanceHome,
  efficiencyHome,
  sortTeams,
  efficiencyAway,
  goalsBalanceAway,
  efficiencyTotal,
  totalPointsAll,
};
