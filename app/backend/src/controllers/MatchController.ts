import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

export default class MatchController {
  constructor(private matchService = new MatchService()) { }

  public async getAllMatches(req: Request, res: Response) {
    const matchesInProgress = req.query.inProgress as string | undefined;
    let serviceResponse;

    if (matchesInProgress === undefined) {
      serviceResponse = await this.matchService.getAllMatches();
    } else {
      serviceResponse = await this.matchService.getByProgress(matchesInProgress);
    }

    return res.status(200).json(serviceResponse.data);
  }

  public async updateById(req: Request, res: Response) {
    const { id } = req.params;
    const serviceResponse = await this.matchService.updateStatusById(Number(id));

    return res.status(200).json(serviceResponse.data);
  }

  public async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const serviceResponse = await this.matchService
      .updateMatch(Number(id), homeTeamGoals, awayTeamGoals);
    return res.status(200).json(serviceResponse.data);
  }

  public async createMatch(req: Request, res: Response) {
    const serviceResponse = await this.matchService.createMatch(req.body);

    if (serviceResponse.status === 'NOT_FOUND') {
      return res.status(404).json(serviceResponse.data);
    }
    return res.status(201).json(serviceResponse.data);
  }
}
