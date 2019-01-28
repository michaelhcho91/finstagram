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

user1 = User.create({ username: "michael", name: "", email: "michael@email.com", password: "password" })
user2 = User.create({ username: "richard", name: "", email: "richard@email.com", password: "password" })
user3 = User.create({ username: "uriah", name: "", email: "uriah@email.com", password: "password" })
user4 = User.create({ username: "grace", name: "", email: "grace@email.com", password: "password" })

user1.photo.attach(io: File.open("#{Rails.root}/app/assets/images/session/default_profile.jpg"), filename: "default_profile.jpg")
user2.photo.attach(io: File.open("#{Rails.root}/app/assets/images/session/default_profile.jpg"), filename: "default_profile.jpg")
user3.photo.attach(io: File.open("#{Rails.root}/app/assets/images/session/default_profile.jpg"), filename: "default_profile.jpg")
user4.photo.attach(io: File.open("#{Rails.root}/app/assets/images/session/default_profile.jpg"), filename: "default_profile.jpg")