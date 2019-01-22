# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all

User.create({ username: "demo", email: "demo@demo.com", password: "password", name: "Demo User"})

User.create({ username: "michael", email: "michael@email.com", password: "password"})
User.create({ username: "richard", email: "richard@email.com", password: "password"})
User.create({ username: "uriah", email: "uriah@email.com", password: "password"})
User.create({ username: "grace", email: "grace@email.com", password: "password"})