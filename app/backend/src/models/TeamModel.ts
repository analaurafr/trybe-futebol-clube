import { ITeamModel } from '../Interfaces/teams/ITeamModel';
import { ITeam } from '../Interfaces/teams/ITeam';
import SequelizeTeam from '../database/models/SequelizeTeam';

export default class TeamModel implements ITeamModel {
  private model = SequelizeTeam;
  async findAll(): Promise<ITeam[]> {
    const teams = await this.model.findAll();
    return teams;
  }

  async findById(id: number): Promise<ITeam | null> {
    const team = await this.model.findByPk(id);
    if (!team) return null;
    return team;
  }
}
