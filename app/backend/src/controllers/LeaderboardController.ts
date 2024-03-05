import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  constructor(private leaderboardService = new LeaderboardService()) {}

  async getAllHome(req: Request, res: Response) {
    const { data } = await this.leaderboardService.getAllLeaderHome();
    return res.status(200).json(data);
  }

  async getAllAway(req: Request, res: Response) {
    const { data } = await this.leaderboardService.getAllLeaderAway();
    res.status(200).json(data);
  }

  async getAll(req: Request, res: Response) {
    const { data } = await this.leaderboardService.getAllLeaderbord();
    return res.status(200).json(data);
  }
}
