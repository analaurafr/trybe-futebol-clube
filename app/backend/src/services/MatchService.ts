import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { IMatch } from '../Interfaces/matches/IMatch';
import MatchModel from '../models/MatchModel';
import TeamService from './TeamService';
import { MatchInfos } from '../Interfaces/matches/MatchInfo';

export default class MatchsService {
  [x: string]: any;
  constructor(
    private matchModel = new MatchModel(),
    private teamService = new TeamService(),
  ) {}

  async getAllMatchs(): Promise<ServiceResponse<IMatch[]>> {
    const matchs = await this.matchModel.findAll();
    if (!matchs) return { status: 'NOT_FOUND', data: { message: 'Teams not found' } };
    return { status: 'SUCCESSFUL', data: matchs };
  }

  async getFiltredMatchs(query: string): Promise<ServiceResponse<IMatch[]>> {
    const matchsFiltred = await this.matchModel.findMatchsFiltred(query);
    return { status: 'SUCCESSFUL', data: matchsFiltred };
  }

  async updateProgress(id:number): Promise<ServiceResponse<{ message: 'Finished' }>> {
    try {
      await this.matchModel.patchInprogress(id);
      return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
    } catch (error) {
      throw new Error('Team not found');
    }
  }

  async updateScore(homeTeamGoals:
  number, awayTeamGoals: number, id: number): Promise<ServiceResponse<{ message:'ok' }>> {
    await this.matchModel.updateScore(homeTeamGoals, awayTeamGoals, id);
    return { status: 'SUCCESSFUL', data: { message: 'ok' } };
  }

  async create(matchInfos: MatchInfos): Promise<ServiceResponse<IMatch>> {
    const { homeTeamId, awayTeamId } = matchInfos;

    const [teamExist1, teamExist2] = await Promise.all([
      this.teamService.getById(Number(homeTeamId)),
      this.teamService.getById(Number(awayTeamId)),
    ]);

    if (teamExist1.status === 'NOT_FOUND' || teamExist2.status === 'NOT_FOUND') {
      return {
        status: 'NOT_FOUND',
        data: { message: 'There is no team with such id!' },
      };
    }

    const createdMatch = await this.matchModel.create(matchInfos);

    return { status: 'CREATED', data: createdMatch };
  }
}
