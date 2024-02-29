import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import sequelize from '.';

class ModelTeam extends Model<InferAttributes<ModelTeam>,
InferCreationAttributes<ModelTeam>> {
  declare id: CreationOptional<number>;
  declare teamName: string;
}

ModelTeam.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'team_name',
  },
}, {
  sequelize,
  underscored: true,
  modelName: 'teams',
  timestamps: false,
});

export default ModelTeam;