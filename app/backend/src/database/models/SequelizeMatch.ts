import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';
import SequelizeTeam from './SequelizeTeam';

class ModelMatch extends Model<InferAttributes<ModelMatch>,
InferCreationAttributes<ModelMatch>> {
  declare id: CreationOptional<number>;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId:number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

ModelMatch.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'home_team_id',
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'home_team_goals',
  },
  awayTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'away_team_id',
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'away_team_goals',
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    field: 'in_progress',
  },
}, {
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
  underscored: true,
});

ModelMatch.belongsTo(SequelizeTeam, { as: 'homeTeam', foreignKey: 'home_team_id' });
ModelMatch.belongsTo(SequelizeTeam, { as: 'awayTeam', foreignKey: 'away_team_id' });
SequelizeTeam.hasMany(ModelMatch, { foreignKey: 'homeTeamId', as: 'homeMatch' });
SequelizeTeam.hasMany(ModelMatch, { foreignKey: 'awayTeamId', as: 'awayMatch' });

export default ModelMatch;
