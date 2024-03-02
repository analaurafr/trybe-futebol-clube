import { Request, Response } from 'express';
import MatchService from '../services/MatchService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class MatchController {
  constructor(
    private matchService = new MatchService(),
  ) { }

  public async getAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    if (!inProgress) {
      const serviceResponse = await this.matchService.getAllMatches();
      return res.status(200).json(serviceResponse.data);
    }
    const inProgressFilter = inProgress === 'true';
    const serviceResponse = await this.matchService.findByProgress(inProgressFilter);
    res.status(200).json(serviceResponse.data);
  }

  public async finishMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { status, data } = await this.matchService.finishMatch(Number(id));
    res.status(mapStatusHTTP(status)).json(data);
  }

  public async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const { status, data } = await this.matchService
      .updateMatch(Number(id), homeTeamGoals, awayTeamGoals);
    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async create(req: Request, res: Response) {
    const { status, data } = await this.matchService.create(req.body);
    res.status(mapStatusHTTP(status)).json(data);
  }
}
