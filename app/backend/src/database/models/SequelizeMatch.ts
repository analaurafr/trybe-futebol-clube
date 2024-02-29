import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import sequelize from './index';
import ModelTeam from './SequelizeTeam';

class ModelMatch extends Model<InferAttributes<ModelMatch>,
InferCreationAttributes<ModelMatch>> {
  declare id: CreationOptional<number>;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

ModelMatch.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
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
  sequelize,
  modelName: 'matches',
  timestamps: false,
});

ModelMatch.belongsTo(ModelTeam, { foreignKey: 'homeTeamId', as: 'homeTeam' });
ModelMatch.belongsTo(ModelTeam, { foreignKey: 'awayTeamId', as: 'awayTeam' });
ModelTeam.hasMany(ModelMatch, { foreignKey: 'homeTeamId', as: 'homeMatch' });
ModelTeam.hasMany(ModelMatch, { foreignKey: 'awayTeamId', as: 'awayMatch' });

export default ModelMatch;
