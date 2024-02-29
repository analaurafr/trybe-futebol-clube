import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import sequelize from './index';

class ModelUser extends Model<InferAttributes<ModelUser>,
InferCreationAttributes<ModelUser>> {
  declare id: CreationOptional<number>;
  declare username: string;
  declare role: string;
  declare email: string;
  declare password: string;
}

ModelUser.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'users',
  timestamps: false,
});

export default ModelUser;