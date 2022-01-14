const { olympic_winner, sport, country } = require('../models')
const { Op } = require('sequelize')
const moment = require('moment')

const pagination = (page, size) => {
    const limit = size ? +size : 100;
    const offset = ((page - 1) * limit) || 0;

    return { limit, offset };
};

const paging = (data, items, page, limit, message) => {
    // console.log(">>>>ITEMS", items);
    const prevPage = page ? +page - 1 : 1;
    const currentPage = page ? +page : 1;
    const nextPage = page ? +page + 1 : 2;
    const pages = Math.ceil(items / limit);
    const winners = data;

    return { items, winners, prevPage, currentPage, nextPage, pages, message };
};

class Olympic {
    static async retrieveAll(req, res, next) {
        try {

            let {
                orders = 'id',
                sort = 'ASC',
                page,
                size,
                cname,
                bronze,
                minYear,
                maxYear,
                eqYear,
                gtYear,
                gteYear,
                ltYear,
                lteYear,
                neYear,
                eqDate,
                gtDate,
                gteDate,
                ltDate,
                lteDate,
                neDate,
                minDate,
                maxDate
            } = req.query;

            const { limit, offset } = pagination(page, size);

            let countryFilter;
            if (cname == 'Australia') {
                countryFilter = { [Op.eq]: 'Australia' }
            } else if (cname == 'China') {
                countryFilter = { [Op.eq]: 'China' }
            } else if (cname == 'Sweden') {
                countryFilter = { [Op.eq]: 'Sweden' }
            } else {
                countryFilter = { [Op.ne]: null }
            }

            let bronzeFilter;
            if (bronze == 1) {
                bronzeFilter = { [Op.eq]: 1 }
            } else if (bronze == 2) {
                bronzeFilter = { [Op.eq]: 2 }
            } else {
                bronzeFilter = { [Op.ne]: null }
            }

            // let yearFilter = (minYear || maxYear) ? { [Op.between]: [minYear, maxYear] } : { [Op.ne]: null }
            let yearFilter;
            if (minYear || maxYear) {
                yearFilter = { [Op.between]: [minYear, maxYear] }
            } else if (eqYear) {
                yearFilter = { [Op.eq]: eqYear }
            } else if (gtYear) {
                yearFilter = { [Op.gt]: gtYear }
            } else if (gteYear) {
                yearFilter = { [Op.gte]: gteYear }
            } else if (ltYear) {
                yearFilter = { [Op.lt]: ltYear }
            } else if (lteYear) {
                yearFilter = { [Op.lte]: lteYear }
            } else if (neYear) {
                yearFilter = { [Op.ne]: neYear }
            } else {
                yearFilter = { [Op.ne]: null }
            }

            // let dateFilter = (minDate || maxDate) ? { [Op.between]: [minDate, maxDate] } : { [Op.ne]: null }
            let dateFilter;
            if (minDate || maxDate) {
                dateFilter = { [Op.between]: [minDate, maxDate] }
            } else if (eqDate) {
                dateFilter = { [Op.eq]: eqDate }
            } else if (gtDate) {
                dateFilter = { [Op.gt]: gtDate }
            } else if (gteDate) {
                dateFilter = { [Op.gte]: gteDate }
            } else if (ltDate) {
                dateFilter = { [Op.lt]: ltDate }
            } else if (lteDate) {
                dateFilter = { [Op.lte]: lteDate }
            } else if (neDate) {
                dateFilter = { [Op.ne]: neDate }
            } else {
                dateFilter = { [Op.ne]: null }
            }

            // const roomStatus = status ? status : { [Op.ne]: null };

            const data = await olympic_winner.findAndCountAll({
                where: {
                    year: yearFilter,
                    date: dateFilter,
                    bronze: bronzeFilter,
                },
                attributes: ['id', 'athlete', 'year', 'date', 'gold', 'silver', 'bronze'],
                include: [
                    {
                        model: country,
                        where: { name: countryFilter },
                        attributes: ['name'],
                    },
                    {
                        model: sport,
                        attributes: ['name'],
                    }
                ],
                order: [
                    [orders || 'athlete' || 'countryId' || 'year' || 'date' || 'sportId' || 'gold' || 'silver' || 'bronze', sort || 'DESC'],
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