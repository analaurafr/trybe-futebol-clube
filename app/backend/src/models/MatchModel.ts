import { MatchInfos } from '../Interfaces/matches/MatchInfo';
import { IMatch } from '../Interfaces/matches/IMatch';
import SequelizeMatches from '../database/models/SequelizeMatch';
import SequelizeTeam from '../database/models/SequelizeTeam';

export default class MatchModel {
  private matchsModel = SequelizeMatches;

  async findAll(): Promise<IMatch[]> {
    const teams = await this.matchsModel.findAll({
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
      ],
      attributes: { exclude: ['home_team_id', 'away_team_id'] },
    });

    return teams;
  }

  async findMatchsFiltred(query: string): Promise<IMatch[]> {
    const progress = query === 'true';
    const teams = await this.matchsModel.findAll({
      where: { inProgress: progress },
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
      ],
      attributes: { exclude: ['home_team_id', 'away_team_id'] },
    });
    return teams;
  }

  async patchInprogress(id: number): Promise<void> {
    try {
      await this.matchsModel.update({ inProgress: false }, { where: { id } });
    } catch (error) {
      throw new Error('Match not found');
    }
  }

  async updateScore(homeTeamGoals: number, awayTeamGoals: number, id: number): Promise<void> {
    try {
      await this.matchsModel.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
    } catch (error) {
      throw new Error('Match not found');
    }
  }

  async create(matchInfos: MatchInfos): Promise<IMatch> {
    const { homeTeamId, homeTeamGoals, awayTeamGoals, awayTeamId } = matchInfos;

    try {
      const createdMatch = await this.matchsModel.create({
        homeTeamGoals,
        homeTeamId,
        awayTeamGoals,
        awayTeamId,
        inProgress: true,
      });

      return createdMatch;
    } catch (error) {
      throw new Error('Não foi possível criar a partida');
    }
  }
}
