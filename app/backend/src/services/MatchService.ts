import MatchModel from '../models/MatchModel';
import { IMatch, IMatchReq } from '../Interfaces/matches/IMatch';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import TeamModel from '../models/TeamModel';

export default class MatchService {
  private matchModel: MatchModel;
  private teamModel: TeamModel;

  constructor() {
    this.matchModel = new MatchModel();
    this.teamModel = new TeamModel();
  }

  public async getAllMatches(): Promise<ServiceResponse<IMatch[]>> {
    const allMatches = await this.matchModel.findAll();

    if (!allMatches) {
      return { status: 'NOT_FOUND', data: { message: 'Not Found' } };
    }

    return { status: 'SUCCESSFUL', data: allMatches };
  }

  public async getByProgress(progressParam: boolean): Promise<ServiceResponse<IMatch[]>> {
    const matchesInProgress = await this.matchModel.findByProgress(progressParam);

    return { status: 'SUCCESSFUL', data: matchesInProgress };
  }

  public async updateStatusById(id: number): Promise<ServiceResponse<IMatch[]>> {
    const updatedMatch = await this.matchModel.updateStatus(id);

    if (updatedMatch === 0) {
      return { status: 'NOT_FOUND', data: { message: 'Not Found' } };
    }

    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  public async updateMatch(
    id: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<ServiceResponse<IMatch[]>> {
    await this.matchModel.updateMatch(id, homeTeamGoals, awayTeamGoals);

    return { status: 'SUCCESSFUL', data: { message: 'Match updated' } };
  }

  public async createMatch(match: IMatchReq): Promise<ServiceResponse<IMatch>> {
    const homeTeamId = await this.teamModel.findById(match.homeTeamId);
    const awayTeamId = await this.teamModel.findById(match.awayTeamId);

    if (!homeTeamId || !awayTeamId) {
      return { status: 'NOT_FOUND', data: { message: 'There is no team with such id!' } };
    }

    const newMatch = await this.matchModel.create({ ...match, inProgress: true });

    return { status: 'SUCCESSFUL', data: newMatch };
  }
}
