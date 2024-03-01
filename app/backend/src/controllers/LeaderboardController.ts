import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  constructor(
    private leaderboardService = new LeaderboardService(),
  ) {}

  public async getHomeTeam(req: Request, res: Response) {
    const serviceResponse = await this.leaderboardService.getHomeTeam();

    res.status(200).json(serviceResponse.data);
  }

  public async getAwayTeam(req: Request, res: Response) {
    const serviceResponse = await this.leaderboardService.getAwayTeam();

    res.status(200).json(serviceResponse.data);
  }
}
