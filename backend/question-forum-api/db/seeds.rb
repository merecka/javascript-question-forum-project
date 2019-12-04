# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create(name: "Alex", email: "me@email.com")
User.create(name: "Bob", email: "bob@hotmail.com")
User.create(name: "Jim", email: "jim@aol.com")

PrimaryComment.create(user_id: 1, comment: "Is this the first question in this forum?")

SecondaryComment.create(primary_comment_id: 1, user_id: 2, comment: "Yes, I think it is the first question!")
SecondaryComment.create(primary_comment_id: 1, user_id: 3, comment: "I agree, I think it's the first comment as well!")
