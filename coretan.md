npx sequelize model:generate --name olympic_winner --attributes athlete:string,age:integer,countryId:integer,country_group:string,year:integer,date:date,sportId:integer,gold:integer,silver:integer,bronze:integer,total:integer

npx sequelize model:generate --name sport --attributes name:string

npx sequelize model:generate --name country --attributes name:string

target_key
source_key


'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('countries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('countries');
  }
};

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class country extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.country.hasMany(models.olympic_winner, { foreignKey: 'countryId' })
    }
  };
  country.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    timestamps: true,
    modelName: 'country',
  });
  return country;
};


'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sports', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('sports');
  }
};

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class sport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.sport.hasMany(models.olympic_winner, { foreignKey: 'sportId' })
    }
  };
  sport.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    timestamps: true,
    modelName: 'sport',
  });
  return sport;
};


'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('olympic_winners', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      athlete: {
        type: Sequelize.STRING
      },
      age: {
        type: Sequelize.INTEGER
      },
      countryId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'countries',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      country_group: {
        type: Sequelize.STRING
      },
      year: {
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.DATE
      },
      sportId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'sports',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      gold: {
        type: Sequelize.INTEGER
      },
      silver: {
        type: Sequelize.INTEGER
      },
      bronze: {
        type: Sequelize.INTEGER
      },
      total: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('olympic_winners');
  }
};

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class olympic_winner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.olympic_winner.belongsTo(models.country, { foreignKey: 'countryId' })
      models.olympic_winner.belongsTo(models.sport, { foreignKey: 'sportId' })
    }
  };
  olympic_winner.init({
    athlete: DataTypes.STRING,
    age: DataTypes.INTEGER,
    countryId: DataTypes.INTEGER,
    country_group: DataTypes.STRING,
    year: DataTypes.INTEGER,
    date: DataTypes.DATE,
    sportId: DataTypes.INTEGER,
    gold: DataTypes.INTEGER,
    silver: DataTypes.INTEGER,
    bronze: DataTypes.INTEGER,
    total: DataTypes.INTEGER
  }, {
    sequelize,
    timestamps: true,
    modelName: 'olympic_winner',
  });
  return olympic_winner;
};