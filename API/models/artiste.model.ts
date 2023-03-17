import { DataTypes, Sequelize } from "sequelize";

export default (sequelize: Sequelize, schema: string) => {
    return sequelize.define("artiste", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nom: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [1, 255]
            }
        },
        photo: {
            type: DataTypes.STRING,
            validate: {
                len: [1, 255]
            }
        },
        biographie: {
            type: DataTypes.TEXT
        },
        lien_video: {
            type: DataTypes.STRING,
            validate: {
                len: [1, 255],
                isURL: true,
                correctUrl: function (value) {
                    if (!value.includes('youtube.com/embed/') && !value.includes('youtu.be') && !value.includes('youtube.com/watch?v=')) {
                        throw new Error('Invalid youtube URL');
                    }
                }
            }
        },
        lien_site: {
            type: DataTypes.STRING,
            validate: {
                len: [1, 255],
                isURL: true
            }
        }
    }, {
        schema: schema,
        timestamps: false,
        freezeTableName: true,
        indexes: [
            {
                unique: true,
                fields: ['nom']
            }
        ],
        hooks: {
            beforeCreate: async (artiste: any) => {
                if (artiste.lien_video) {
                    artiste.lien_video = artiste.lien_video.replace('watch?v=', 'embed/');
                }
            }
        }
    });
}