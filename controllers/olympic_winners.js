const { olympic_winner, sport, country } = require('../models')
const { Op } = require('sequelize')

const pagination = (page, size) => {
    const limit = size ? +size : 100;
    const offset = ((page - 1) * limit) | 0;

    return { limit, offset };
};

const paging = (data, items, page, limit, message) => {
    // console.log(">>>>ITEMS", items);
    const onPage = page ? +page : 1;
    const pages = Math.ceil(items / limit);
    const winners = data;

    return { items, winners, pages, onPage, message };
};

class Olympic {
    static async retrieveAll(req, res, next) {
        try {

            const { orders = 'id', sort = 'ASC', page, size, countryName } = req.query;
            const { limit, offset } = pagination(page, size);

            const arrCountry = ['Australia', 'China', 'Sweden']
            for (let i = 0; i < arrCountry.length; i++) {
                let newStr = '';
                if (arrCountry[i] == 'Australia') {
                    return newStr = 'Australia'
                } else if (arrCountry[i] == 'China') {
                    return newStr = 'China'
                } else if (arrCountry[i] == 'Sweden') {
                    return newStr = 'Sweden'
                } else {

                }
            }

            const data = await olympic_winner.findAndCountAll({
                attributes: ['athlete', 'year', 'date', 'gold', 'silver', 'bronze'],
                include: [
                    {
                        model: country,
                        attributes: [['name', 'countryName']],
                    },
                    {
                        model: sport,
                        attributes: [['name', 'sportName']],
                    }
                ],
                order: [
                    [orders || 'athlete' || 'year' || 'date' || 'gold' || 'silver' || 'bronze', sort || 'DESC'],
                    // [{ model: sport, as: 'sport' }, 'name', sort || 'DESC'],
                    // [{ model: country, as: 'country' }, 'name', sort || 'DESC']
                ],
                limit,
                offset
            })

            res.status(200).json(paging(data.rows, data.count, page, limit, 'Success'))

        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = Olympic;