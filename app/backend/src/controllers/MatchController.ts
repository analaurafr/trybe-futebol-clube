import { Request, Response } from 'express';
import HTTPMap from '../utils/mapStatusHTTP';
import MatchsService from '../services/MatchService';

export default class MatchsController {
  constructor(private matchService = new MatchsService()) {}

  async getAllMatchs(req: Request, res: Response) {
    const { inProgress } = req.query;
    if (!inProgress) {
      const { status, data } = await this.matchService.getAllMatchs();
      return res.status(HTTPMap(status)).json(data);
    }
    const { status, data } = await this.matchService.getFiltredMatchs(inProgress.toString());
    return res.status(HTTPMap(status)).json(data);
  }

  async updateProgress(req: Request, res: Response) {
    const { id } = req.params;
    const { status, data } = await this.matchService.updateProgress(Number(id));
    return res.status(HTTPMap(status)).json(data);
  }

  async updateScore(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const { status, data } = await this.matchService
      .updateScore(Number(homeTeamGoals), Number(awayTeamGoals), Number(id));
    return res.status(HTTPMap(status)).json(data);
  }

  async createMatch(req:Request, res: Response) {
    const { status, data } = await this.matchService.create(req.body);
    return res.status(HTTPMap(status)).json(data);
  }
}
