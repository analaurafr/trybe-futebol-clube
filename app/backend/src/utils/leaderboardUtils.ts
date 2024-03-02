import ILeaderboard from '../Interfaces/leaderboard/ILeaderboard';
import { IMatch } from '../Interfaces/matches/IMatch';

function getTotalVictories(id: number, matches: IMatch[]):number {
  const total = matches.filter((match) => id === match.homeTeamId
    && match.homeTeamGoals > match.awayTeamGoals).length;
  return total;
}

function getTotalDraws(id: number, matches: IMatch[]) {
  const total = matches.filter((match) => id === match.homeTeamId
    && match.homeTeamGoals === match.awayTeamGoals).length;
  return total;
}

function getTotalPoints(id: number, matches: IMatch[]) {
  return (getTotalVictories(id, matches) * 3) + getTotalDraws(id, matches);
}

function getTotalLosses(id: number, matches: IMatch[]) {
  const total = matches.filter((match) => id === match.homeTeamId
     && match.homeTeamGoals < match.awayTeamGoals).length;
  return total;
}

function getGoalsFavor(id: number, matches: IMatch[]):number {
  const total = matches.reduce((acc, match) => {
    if (id === match.homeTeamId) {
      return acc + match.homeTeamGoals;
    }
    return acc;
  }, 0);
  return total;
}

function getGoalsOwn(id: number, matches: IMatch[]):number {
  const total = matches.reduce((acc, match) => {
    if (id === match.homeTeamId) {
      return acc + match.awayTeamGoals;
    }
    return acc;
  }, 0);
  return total;
}

function getTotalGames(id: number, matches: IMatch[]) {
  const total = matches.filter((match) =>
    id === match.homeTeamId).length;
  return total;
}

function getGoalsBalance(id: number, matches: IMatch[]): number {
  const goalsFavor = getGoalsFavor(id, matches);
  const goalsOwn = getGoalsOwn(id, matches);

  return goalsFavor - goalsOwn;
}

function getEfficiency(id: number, matches: IMatch[]): string {
  const totalPoints = getTotalPoints(id, matches);
  const totalGames = getTotalGames(id, matches);

  const possiblePoints = totalGames * 3;
  const efficiency = (totalPoints / possiblePoints) * 100;

  return efficiency.toFixed(2);
}

function getTeamsByOrder(team: ILeaderboard[]): ILeaderboard[] {
  team.sort((a, b) => b.totalPoints - a.totalPoints
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor);
  return team;
}

function getTotalVictoriesA(id: number, matches: IMatch[]): number {
  const total = matches.filter((match) => id === match.awayTeamId
      && match.awayTeamGoals > match.homeTeamGoals).length;
  return total;
}

function getTotalDrawsA(id: number, matches: IMatch[]): number {
  const total = matches.filter((match) => id === match.awayTeamId
      && match.homeTeamGoals === match.awayTeamGoals).length;
  return total;
}

function getTotalPointsA(id: number, matches: IMatch[]): number {
  return (getTotalVictoriesA(id, matches) * 3) + getTotalDrawsA(id, matches);
}

function getTotalLossesA(id: number, matches: IMatch[]): number {
  const total = matches.filter((match) => id === match.awayTeamId
      && match.awayTeamGoals < match.homeTeamGoals).length;
  return total;
}

function getGoalsFavorA(id: number, matches: IMatch[]): number {
  const total = matches.reduce((acc, match) => {
    if (id === match.awayTeamId) {
      return acc + match.awayTeamGoals;
    }
    return acc;
  }, 0);
  return total;
}

function getGoalsOwnA(id: number, matches: IMatch[]): number {
  const total = matches.reduce((acc, match) => {
    if (id === match.awayTeamId) {
      return acc + match.homeTeamGoals;
    }
    return acc;
  }, 0);
  return total;
}

function getTotalGamesA(id: number, matches: IMatch[]): number {
  const total = matches.filter((match) =>
    id === match.awayTeamId).length;
  return total;
}

function getGoalsBalanceA(id: number, matches: IMatch[]): number {
  const goalsFavor = getGoalsFavorA(id, matches);
  const goalsOwn = getGoalsOwnA(id, matches);

  return goalsFavor - goalsOwn;
}

function getEfficiencyA(id: number, matches: IMatch[]): string {
  const totalPoints = getTotalPointsA(id, matches);
  const totalGames = getTotalGamesA(id, matches);

  const possiblePoints = totalGames * 3;
  const efficiency = (totalPoints / possiblePoints) * 100;

  return efficiency.toFixed(2);
}

export {
  getGoalsFavor,
  getGoalsOwn,
  getTotalDraws,
  getTotalGames,
  getTotalLosses,
  getTotalPoints,
  getTotalVictories,
  getGoalsBalance,
  getEfficiency,
  getTeamsByOrder,
  getTotalVictoriesA,
  getTotalDrawsA,
  getTotalPointsA,
  getTotalLossesA,
  getGoalsFavorA,
  getGoalsOwnA,
  getTotalGamesA,
  getGoalsBalanceA,
  getEfficiencyA,
};
