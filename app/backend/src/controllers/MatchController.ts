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
}
