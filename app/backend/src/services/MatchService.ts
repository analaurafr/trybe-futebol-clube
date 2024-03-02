import TeamModel from '../models/TeamModel';
import MatchModel from '../models/MatchModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import IMatchModel from '../Interfaces/matches/IMatchModel';
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

  static async verifyTeams(homeTeamId: number, awayTeamId: number): Promise<boolean> {
    const teams = new TeamModel();
    const foundHomeTeam = await teams.findById(homeTeamId);
    const foundAwayTeam = await teams.findById(awayTeamId);
    if (!foundAwayTeam || !foundHomeTeam) return false;
    return true;
  }

  public async create(data: IMatch): Promise<ServiceResponse<IMatch | { message:string }>> {
    const isValidTeams = await MatchService
      .verifyTeams(data.homeTeamId, data.awayTeamId);

    if (!isValidTeams) {
      return {
        status: 'NOT_FOUND',
        data: { message: 'There is no team with such id!' },
      };
    }

    if (data.homeTeamId === data.awayTeamId) {
      return {
        status: 'UNPROCESSABLE_ENTITY',
        data: { message: 'It is not possible to create a match with two equal teams' } };
    }

    const newMatch = await this.matchModel.create({ ...data, inProgress: true });
    return {
      status: 'CREATED',
      data: newMatch,
    };
  }
}
