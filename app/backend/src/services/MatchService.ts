import MatchModel from '../models/MatchModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import IMatchModel, { NewEntity } from '../Interfaces/matches/IMatchModel';
import { IMatch } from '../Interfaces/matches/IMatch';
import TeamsService from './TeamService';

export default class MatchService {
  constructor(
    private matchModel: IMatchModel = new MatchModel(),
    private teamService = new TeamsService(),
  ) { }

  public async getAllMatches(): Promise<ServiceResponse<IMatch[]>> {
    const allMatches = await this.matchModel.findAll();
    return { status: 'SUCCESSFUL', data: allMatches };
  }

  public async findByProgress(progress: boolean): Promise<ServiceResponse<IMatch[]>> {
    const filteredMatches = await this.matchModel.findByProgress(progress);
    return { status: 'SUCCESSFUL', data: filteredMatches };
  }

  public async finishMatch(id: number):Promise<ServiceResponse<{ message: 'Finished' }>> {
    await this.matchModel.finishMatch(id);
    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  public async updateMatch(id: number, homeTeamGoals: number, awayTeamGoals: number):
  Promise<ServiceResponse<string>> {
    const result = await this.matchModel.updateMatch(id, homeTeamGoals, awayTeamGoals);
    return { status: 'SUCCESSFUL', data: result };
  }

  public async create(data:NewEntity<IMatch>): Promise<ServiceResponse<IMatch>> {
    const { homeTeamId, awayTeamId } = data;
    if (homeTeamId === awayTeamId) {
      return {
        status: 'INVALID',
        data: { message: 'It is not possible to create a match with two equal teams' } };
    }
    const homeTeamExists = await this.teamService.getTeamById(Number(homeTeamId));
    const awayTeamExists = await this.teamService.getTeamById(Number(awayTeamId));
    if (homeTeamExists.status === 'NOT_FOUND' || awayTeamExists.status === 'NOT_FOUND') {
      return { status: 'NOT_FOUND', data: { message: 'There is no team with such id!' } };
    }

    const newData = await this.matchModel.create(data);
    return { status: 'CREATED', data: newData };
  }
}
