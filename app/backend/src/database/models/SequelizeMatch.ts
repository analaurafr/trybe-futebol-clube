import { DataTypes, Model, Optional } from 'sequelize';
import db from '.';
import SequelizeTeam from './SequelizeTeam';

interface MatchAttributes {
  id: number;
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

type MatchCreationAttributes = Optional<MatchAttributes, 'id'>;

class SequelizeMatches extends Model<MatchAttributes, MatchCreationAttributes> {
  public id!: number;
  public homeTeamId!: number;
  public homeTeamGoals!: number;
  public awayTeamId!: number;
  public awayTeamGoals!: number;
  public inProgress!: boolean;
}

SequelizeMatches.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
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
  },
  {
    underscored: true,
    sequelize: db,
    modelName: 'Match',
    timestamps: false,
  },
);

SequelizeMatches.belongsTo(SequelizeTeam, { as: 'homeTeam', foreignKey: 'home_team_id' });
SequelizeMatches.belongsTo(SequelizeTeam, { as: 'awayTeam', foreignKey: 'away_team_id' });
SequelizeTeam.hasMany(SequelizeMatches, { foreignKey: 'homeTeamId', as: 'homeMatch' });
SequelizeTeam.hasMany(SequelizeMatches, { foreignKey: 'awayTeamId', as: 'awayMatch' });

export default SequelizeMatches;
