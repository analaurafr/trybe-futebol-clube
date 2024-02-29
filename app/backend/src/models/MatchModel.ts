import { IMatch } from '../Interfaces/matches/IMatch';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';
import SequelizeTeamModel from '../database/models/SequelizeTeam';
import SequelizeMatchModel from '../database/models/SequelizeMatch';

export default class MatchModel implements IMatchModel {
  private model = SequelizeMatchModel;

  async findAll(): Promise<IMatch[]> {
    const data = await this.model.findAll({
      include: [
        { model: SequelizeTeamModel,
          as: 'homeTeam',
          attributes: { exclude: ['id'] },
        },

        { model: SequelizeTeamModel,
          as: 'awayTeam',
          attributes: { exclude: ['id'] },
        },
      ],
    });

    return data;
  }

  async findByProgress(progressParam: string): Promise<IMatch[]> {
    const stringToBoolean = progressParam === 'true';
    const data = await this.model.findAll({
      where: { inProgress: stringToBoolean },
      include: [
        { model: SequelizeTeamModel,
          as: 'homeTeam',
          attributes: ['teamName'],
        },

        { model: SequelizeTeamModel,
          as: 'awayTeam',
          attributes: ['teamName'],
        },
      ],
    });

    return data;
  }
}
