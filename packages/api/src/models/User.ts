import {
  Model,
  DataTypes,
} from 'sequelize';
import logger from '../logger';

import sequelize from '../sequelize';

import {
  Profile,
  Provider,
} from '../types/Oauth';

import {
  JWTPayload,
} from '../types/Jwt';

class User extends Model {
  public id!: number;

  public name!: string;

  public email!: string;

  public providerId!: string;

  public provider!: Provider;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;

  public toJwt(): JWTPayload {
    return {
      name: this.get('name'),
    };
  }

  static async createFromOAuth(profile: Profile) {
    const [user, created] = await User.findCreateFind({
      defaults: profile,
      where: {
        provider: profile.provider,
        providerId: profile.providerId,
      },
    });
    if (created) {
      logger.info('New user created');
    } else {
      logger.info('User already exists');
    }
    return user;
  }
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  },
  email: {
    type: new DataTypes.STRING(255),
    allowNull: false,
  },
  password: {
    type: new DataTypes.STRING(255),
    allowNull: true,
  },
  provider: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  },
  providerId: {
    field: 'provider_id',
    type: new DataTypes.STRING(255),
    allowNull: false,
  },
  createdAt: {
    field: 'created_at',
    type: new DataTypes.DATE(),
    allowNull: false,
  },
  updatedAt: {
    field: 'updated_at',
    type: new DataTypes.DATE(),
    allowNull: false,
  },
}, {
  timestamps: true,
  tableName: 'users',
  sequelize,
});

export default User;
