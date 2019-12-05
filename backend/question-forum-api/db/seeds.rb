# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create(name: "Moe", email: "moe@email.com", password: "password")
User.create(name: "Bob", email: "bob@hotmail.com", password: "password")
User.create(name: "Jim", email: "jim@aol.com", password: "password")

PrimaryComment.create(user_id: 1, comment: "Is this the first question in this forum?")
SecondaryComment.create(primary_comment_id: 1, user_id: 2, comment: "Yes, I think it is the first question!")
SecondaryComment.create(primary_comment_id: 1, user_id: 3, comment: "I agree, and I think this is the first comment as well!")

PrimaryComment.create(user_id: 1, comment: "Is this the second question in this forum?")
SecondaryComment.create(primary_comment_id: 2, user_id: 2, comment: "Yes, I think it is the second question!")
SecondaryComment.create(primary_comment_id: 2, user_id: 3, comment: "I agree, I think this is the second comment as well!")