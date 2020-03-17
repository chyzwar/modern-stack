import {
  Model,
  DataTypes,
} from 'sequelize';
import sequelize from '../sequelize';


class User extends Model {
  public id!: number;

  public name!: string;

  public preferredName!: string | null;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;
}

User.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  },
  preferredName: {
    type: new DataTypes.STRING(128),
    allowNull: true,
  },
}, {
  tableName: 'users',
  sequelize,
});


export default User;
