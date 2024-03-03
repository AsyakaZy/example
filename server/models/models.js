const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const user = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    firstName: {type: DataTypes.STRING, unique: true, allowNull:false},
    email: {type:DataTypes.STRING, unique:true, allowNull:false},
    password: {type:DataTypes.STRING, allowNull:false},
    role: {type:DataTypes.STRING, allowNull:false},
    fanId:{type:DataTypes.INTEGER, allowNull:true},
    telephoneNumber:{type:DataTypes.STRING, allowNull:false}
} )
const statusPay = sequelize.define('statusPay', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    status: {type:DataTypes.STRING, allowNull:false}
} )
const favouriteClub = sequelize.define('favouriteClub', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
} )
const userTicket = sequelize.define('userTicket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    date: {type:DataTypes.DATE, allowNull:false}
} )

const ticket = sequelize.define('ticket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    price: {type:DataTypes.INTEGER, allowNull:false}
} )
const match = sequelize.define('match', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    date: {type:DataTypes.DATE, allowNull:false},
    time: {type:DataTypes.TIME, allowNull:false},
    tour: {type:DataTypes.INTEGER, allowNull:false}
} )
const news = sequelize.define('news', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    heading: {type:DataTypes.STRING, allowNull:false},
    text: {type:DataTypes.STRING, allowNull:false},
    photo: {type:DataTypes.STRING, allowNull:false},
    date: {type:DataTypes.DATE, allowNull:false}
} )
const clubHome = sequelize.define('clubHome', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
} )
const clubGuest = sequelize.define('clubGuest', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
} )
const stadiums = sequelize.define('stadiums', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type:DataTypes.STRING, unique:true, allowNull:false},
    photo: {type:DataTypes.STRING, allowNull:false}
} )
const sector = sequelize.define('sector', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    numbersector:{type:DataTypes.STRING, allowNull:false}
} )
const row = sequelize.define('row', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    numberrow:{type:DataTypes.STRING, allowNull:false}
} )
const seat = sequelize.define('seat', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    numbeseat:{type:DataTypes.STRING, allowNull:false}
} )
const newsClub = sequelize.define('newsClub', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
} )
const club = sequelize.define('club', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type:DataTypes.STRING,allowNull:false},
    photo: {type:DataTypes.STRING, allowNull:false}
} )
const city = sequelize.define('city', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type:DataTypes.STRING, allowNull:false}
} )
const statusSeat = sequelize.define('statusSeat', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    status: {type:DataTypes.STRING, allowNull:false}
} )

const playerClubHome = sequelize.define('playerClubHome', {
    id: {type:DataTypes.INTEGER, primaryKey:true, autoIncrement: true}
})

const playerClubGuest = sequelize.define('playerClubGuest', {
    id: {type:DataTypes.INTEGER, primaryKey:true, autoIncrement: true}
})

const player = sequelize.define('player', {
    id: {type:DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
    photoPlayer:{type:DataTypes.STRING, allowNull:false},
    namePlayer:{type:DataTypes.STRING, allowNull:false}
})

const poster = sequelize.define('poster', {
    id: {type:DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
    quote:{type:DataTypes.STRING, allowNull:false},
    date:{type:DataTypes.DATE, allowNull:false},
    time:{type:DataTypes.TIME, allowNull:false}
})

club.hasMany(favouriteClub)
favouriteClub.belongsTo(club)

statusPay.hasMany(userTicket)
userTicket.belongsTo(statusPay)

user.hasMany(userTicket)
userTicket.belongsTo(user)

ticket.hasMany(userTicket)
userTicket.belongsTo(ticket)

favouriteClub.hasMany(user)
user.belongsTo(favouriteClub)


match.hasMany(ticket)
ticket.belongsTo(match)

clubHome.hasMany(match)
match.belongsTo(clubHome)

clubGuest.hasMany(match)
match.belongsTo(clubGuest)

stadiums.hasMany(match)
match.belongsTo(stadiums)

club.hasMany(clubHome)
clubHome.belongsTo(club)

club.hasMany(clubGuest)
clubGuest.belongsTo(club)

news.hasMany(newsClub)
newsClub.belongsTo(news)

stadiums.hasMany(club)
club.belongsTo(stadiums)

stadiums.hasMany(sector)
sector.belongsTo(stadiums)

stadiums.hasMany(ticket)
ticket.belongsTo(stadiums)

sector.hasMany(ticket)
ticket.belongsTo(sector)

row.hasMany(ticket)
ticket.belongsTo(row)

seat.hasMany(ticket)
ticket.belongsTo(seat)

sector.hasMany(row)
row.belongsTo(sector)

row.hasMany(seat)
seat.belongsTo(row)

statusSeat.hasMany(ticket)
ticket.belongsTo(statusSeat)

city.hasMany(stadiums)
stadiums.belongsTo(city)

city.hasMany(club)
club.belongsTo(city)

club.hasMany(newsClub)
newsClub.belongsTo(club)

club.hasMany(player)
player.belongsTo(club)

player.hasMany(playerClubHome)
playerClubHome.belongsTo(player)

player.hasMany(playerClubGuest)
playerClubGuest.belongsTo(player)

clubHome.hasMany(poster)
poster.belongsTo(clubHome)

clubGuest.hasMany(poster)
poster.belongsTo(clubGuest)

playerClubHome.hasMany(poster)
poster.belongsTo(playerClubHome)

playerClubGuest.hasMany(poster)
poster.belongsTo(playerClubGuest)

stadiums.hasMany(poster)
poster.belongsTo(stadiums)

city.hasMany(match)
match.belongsTo(city)

module.exports = {
    statusPay, 
    favouriteClub,
    userTicket, 
    user,  
    ticket, 
    match, 
    news, 
    newsClub, 
    clubHome, 
    clubGuest, 
    stadiums, 
    sector, 
    row, 
    seat, 
    statusSeat, 
    city, 
    club, 
    playerClubHome,
    playerClubGuest, 
    player,
    poster 
}