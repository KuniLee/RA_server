function addWeek(date) {
  let data = new Date(date)
  data.setDate(data.getDate() + 7)
  data = [data.getDate(), data.getMonth() + 1, data.getFullYear()].reverse()
  if (data[1] < 10) data[1] = '0' + data[1]
  if (data[2] < 10) data[2] = '0' + data[2]
  return (data = data.join('-').replace(/(^|\/)(\d)(?=\/)/g, '$10$2'))
}
function addMonth(date) {
  let data = new Date(date)
  data.setMonth(data.getMonth() + 1)
  data = [data.getDate(), data.getMonth() + 1, data.getFullYear()].reverse()
  if (data[1] < 10) data[1] = '0' + data[1]
  if (data[2] < 10) data[2] = '0' + data[2]
  return (data = data.join('-').replace(/(^|\/)(\d)(?=\/)/g, '$10$2'))
}

function addDay(date) {
  let data = new Date(date)
  data.setDate(data.getDate() + 1)
  data = [data.getDate(), data.getMonth() + 1, data.getFullYear()].reverse()
  if (data[1] < 10) data[1] = '0' + data[1]
  if (data[2] < 10) data[2] = '0' + data[2]
  return (data = data.join('-').replace(/(^|\/)(\d)(?=\/)/g, '$10$2'))
}

const forReportQuery = {
  function: { week: 'DAYOFMONTH', month: 'DAYOFMONTH', date: 'hour' },
  endOfDate(reportType, date) {
    if (reportType === 'month') return addMonth(date)
    if (reportType === 'week') return addWeek(date)
    if (reportType === 'date') return addDay(date)
  },
  addDate(reportType, date, data) {
    // console.log(reportType, date, data)
    return data.map((item) => {
      const newItem = item

      if (reportType === 'month' || reportType === 'week') {
        newItem[this.function[reportType]] =
          date.slice(0, -2) +
          (item[this.function[reportType]].toString().length == 1
            ? '0' + item[this.function[reportType]]
            : item[this.function[reportType]])
        // + ' 00:00:00'
      }
      if (reportType === 'date') {
        newItem[this.function[reportType]] =
          date +
          ' ' +
          (item[this.function[reportType]].toString().length == 1
            ? '0' + item[this.function[reportType]]
            : item[this.function[reportType]]) +
          ':00:00'
      }

      return newItem
    })
  },
}

module.exports = forReportQuery
