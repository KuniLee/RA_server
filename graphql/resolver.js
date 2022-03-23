const values = require('../models/values')
const { Op } = require('sequelize')
const forReportQuery = require('../utils/forReportQuery')
const sequelize = require('../utils/database')

module.exports = {
  async downloadByTime(data) {
    try {
      return await values.findAll({
        where: {
          timestamp: {
            [Op.between]: [
              data.timeStart / 1000 + 18000,
              data.timeEnd / 1000 + 18000,
            ],
          },
        },
      })
    } catch (error) {
      throw new Error('Fetch todos is not available')
    }
  },
  // addTestUser({ user: { name, email } }) {
  //   const user = { name, email, age: Math.ceil(Math.random() * 30) }
  //   users.push(user)
  //   return user
  // },
  async getValues() {
    try {
      const data = await values.findAll()
      console.log(data[0])
      return data
    } catch (error) {
      throw new Error('Fetch todos is not available')
    }
  },
  async createValue({ value: { deviceId, value, parameter } }) {
    try {
      return await values.create({
        deviceId: deviceId,
        value: value,
        parameter: parameter,
      })
    } catch (error) {
      throw new Error('Fetch todos is not available')
    }
  },
  async report({ reportType, date, offsetInHours }) {
    try {
      const func = forReportQuery.function[reportType]
      const data = await values.findAll({
        attributes: [
          [
            sequelize.fn(
              'ROUND',
              sequelize.fn('AVG', sequelize.col('value')),
              2
            ),
            'average',
          ],
          [
            sequelize.fn(
              `${func}`,
              sequelize.fn(
                'convert_tz',
                sequelize.col('timestamp'),
                '+00:00',
                `${offsetInHours}`
              )
            ),
            `${func}`,
          ],
          'parameter',
        ],
        where: sequelize.where(
          sequelize.fn(
            'convert_tz',
            sequelize.col('timestamp'),
            '+00:00',
            `${offsetInHours}`
          ),
          {
            [Op.between]: [
              `${date} 00:00:00`,
              `${forReportQuery.endOfDate(reportType, date)} 00:00:00`,
            ],
          }
        ),

        group: [`${func}`, 'parameter'],
        // order: [
        //   'parameter',
        //   sequelize.fn('minute', sequelize.col('timestamp')),
        // ],
        raw: true,
      })

      //console.log(forReportQuery.addDate(reportType, date, data))
      return forReportQuery.addDate(reportType, date, data)
    } catch (error) {
      throw new Error(`Ошибка + ${error}`)
    }
  },
}
