import { QueryInterface, DataTypes, Model } from 'sequelize';
import { Users } from '../../Interfaces/users/UserTypes';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable<Model<Users>>('users', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'username'
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  },
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('users');
  },
};
