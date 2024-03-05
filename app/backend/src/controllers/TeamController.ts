import { Request, Response } from 'express';
import TeamService from '../services/TeamService';
import HTTPMap from '../utils/mapStatusHTTP';

export default class TeamController {
  private teamService: TeamService;

  constructor(teamService: TeamService = new TeamService()) {
    this.teamService = teamService;
  }

  public async getAllTeams(req: Request, res: Response) {
    const { status, data } = await this.teamService.getAll();
    const statusCode = HTTPMap(status);
    return res.status(statusCode).json(data);
  }

  public async getTeamById(req: Request, res: Response) {
    const { id } = req.params;
    const { status, data } = await this.teamService.getById(Number(id));
    const statusCode = HTTPMap(status);
    return res.status(statusCode).json(data);
  }
}
