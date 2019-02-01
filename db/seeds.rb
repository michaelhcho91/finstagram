# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Post.destroy_all

demo = User.create({ username: "demo", email: "demo@demo.com", password: "password", name: "Demo User"})
demo.photo.attach(io: File.open("#{Rails.root}/app/assets/images/session/default_profile.jpg"), filename: "default_profile.jpg")