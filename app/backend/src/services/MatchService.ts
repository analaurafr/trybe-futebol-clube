import MatchModel from '../models/MatchModel';
import { IMatch } from '../Interfaces/matches/IMatch';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class MatchService {
  private matchModel: MatchModel;

  constructor() {
    this.matchModel = new MatchModel();
  }

  public async getAllMatches(): Promise<ServiceResponse<IMatch[]>> {
    const allMatches = await this.matchModel.findAll();
    if (!allMatches) {
      return { status: 'NOT_FOUND', data: { message: 'Not Found' } };
    }

    return { status: 'SUCCESSFUL', data: allMatches };
  }

  public async getByProgress(progressParam: string): Promise<ServiceResponse<IMatch[]>> {
    const matchesInProgress = await this.matchModel.findByProgress(progressParam);

    return { status: 'SUCCESSFUL', data: matchesInProgress };
  }
}
