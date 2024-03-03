import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  constructor(
    private leaderboardService = new LeaderboardService(),
  ) {}

  public async getAll(req: Request, res: Response) {
    const data = await this.leaderboardService.homeLeaderboard('home');
    res.status(200).json(data);
  }
}
