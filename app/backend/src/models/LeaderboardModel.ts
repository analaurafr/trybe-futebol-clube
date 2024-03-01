import { ILeaderboardModel } from '../Interfaces/leaderboard/ILeaderboardModel';
import SequelizeMatchModel from '../database/models/SequelizeMatch';
import ModelTeam from '../database/models/SequelizeTeam';

export default class LeaderboardModel implements ILeaderboardModel {
  private teamModel = ModelTeam;

  async findAll(): Promise<any> {
    const data = await this.teamModel.findAll({
      attributes: { exclude: ['id'] },
      include: [
        { model: SequelizeMatchModel,
          as: 'homeMatch',
          attributes: { exclude: ['id'] },
          where: { inProgress: false },
        },
      ],
    });

    return data;
  }

  async findAllAway(): Promise<any> {
    const data = await this.teamModel.findAll({
      attributes: { exclude: ['id'] },
      include: [
        { model: SequelizeMatchModel,
          as: 'awayMatch',
          attributes: { exclude: ['id'] },
          where: { inProgress: false },
        },
      ],
    });

    return data;
  }
}
