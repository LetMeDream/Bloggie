import moment from 'moment'

function Moment (date: string): string {
  return moment(date).format('DD MMM, YYYY.')
}

export default Moment
