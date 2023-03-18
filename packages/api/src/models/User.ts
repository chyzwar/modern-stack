import type {
  CreationAttributes} from "sequelize";
import {
  Model,
  DataTypes,
} from "sequelize";
import {
  Role,
} from "@project/common";
import logger from "../logger.js";
import sequelize from "../sequelize.js";

import type {
  Provider,
} from "../types/Oauth.js";

import type {
  JWTPayload,
} from "../types/Jwt.js";

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
      name: this.get("name"),
    };
  }

  public static async createFromOAuth(profile: CreationAttributes<User>): User {
    const [user, created] = await User.findCreateFind({
      defaults: profile,
      where: {
        provider: profile.provider,
        providerId: profile.providerId,
      },
    });
    if (created) {
      logger.info("New user created");
    }
    else {
      logger.info("User already exists");
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
  role: {
    type: new DataTypes.ENUM<Role>({
      values: [
        Role.Root,
        Role.Admin,
        Role.User,
        Role.Guest,
      ],
    }),
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
    field: "provider_id",
    type: new DataTypes.STRING(255),
    allowNull: false,
  },
  createdAt: {
    field: "created_at",
    type: new DataTypes.DATE(),
    allowNull: false,
  },
  updatedAt: {
    field: "updated_at",
    type: new DataTypes.DATE(),
    allowNull: false,
  },
}, {
  timestamps: true,
  tableName: "users",
  sequelize,
});

export default User;
