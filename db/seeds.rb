# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
seedUrl = "https://demogogue.s3.amazonaws.com/seed/"

u1 = User.create(username: 'Street Justice', email: 'sj@gmail.com', password: 'password', avatar_url: seedUrl + "sj.jpg")
u2 = User.create(username: 'The Hay Babes', email: 'hb@hb.com', password: 'password', avatar_url: seedUrl + "hb.jpg")
u3 = User.create(username: 'Tim Sandberg', email: 'ts@gmail.com', password: 'password', avatar_url: seedUrl + "tim.jpg")
u4 = User.create(username: 'Murderface', email: 'thejwamaicandave@gmail.com', password: 'password', avatar_url: seedUrl + "murderface.jpg")
u5 = User.create(username: 'Replicant', email: 'riped@gmail.com', password: 'password', avatar_url: seedUrl + "piano.jpg")
u6 = User.create(username: 'Midnight', email: 'thejndave@gmail.com', password: 'password', avatar_url: seedUrl + "cyberpunk.jpg")
u7 = User.create(username: 'Wings Hauser', email: 'aq@gmail.com', password: 'password', avatar_url: seedUrl + "wings.jpg")
u8 = User.create(username: 'Hot Beer', email: 'cave@gmail.com', password: 'password', avatar_url: seedUrl + "weirdo.jpg")
u9 = User.create(username: 'Blood On The Traxxxxssss', email: 'asdf@gmail.com', password: 'password', avatar_url: seedUrl + "metal2.jpg")
u10 = User.create(username: 'The Fucking Buckaroos', email: 'tfb@gmail.com', password: 'password', avatar_url: seedUrl + "tfb.jpg")
u11 = User.create(username: 'Guest', email: 'guest@gmail.com', password: 'password', avatar_url: "default_avatar.png")

u1.artist_follows.create({artist_id: 5})
u1.artist_follows.create({artist_id: 3})
u1.artist_follows.create({artist_id: 7})
u1.artist_follows.create({artist_id: 9})
u1.artist_follows.create({artist_id: 4})

u3.artist_follows.create({artist_id: 1})
u3.artist_follows.create({artist_id: 2})
u3.artist_follows.create({artist_id: 6})
u3.artist_follows.create({artist_id: 5})
u3.artist_follows.create({artist_id: 7})


u1.demos.create({title: "Citizen's Arrest", genre: "Hardcore", thumb_url: u1.avatar_url, audio_url: seedUrl + "sj1.mp3"})
u1.demos.create({title: "Question of Honor", genre: "Hardcore", thumb_url: u1.avatar_url, audio_url: seedUrl + "sj2.mp3"})
u1.demos.create({title: "Conan",  genre: "Hardcore", thumb_url: u1.avatar_url,  audio_url: seedUrl + "sj3.mp3"})

u1.demos.create({title: "My Crusade", genre: "Hardcore", thumb_url: u1.avatar_url, audio_url: seedUrl + "sj4.mp3"})

u3.demos.create({title: "Rocky Top", genre: "Bluegrass", thumb_url: u3.avatar_url, audio_url: seedUrl + "rockytop.mp3"})
u1.demos.create({title: "Home Invasion", thumb_url: u1.avatar_url, genre: "Hardcore", audio_url: seedUrl + "sj6.mp3"})

u4.demos.create({title: "DOOOOM!", thumb_url: u4.avatar_url, audio_url: seedUrl + "metal.mp3"})
u1.demos.create({title: "Overlord", thumb_url: u1.avatar_url, audio_url: seedUrl + "sj8.mp3"})
u3.demos.create({title: "Loose Talk", thumb_url: u3.avatar_url, audio_url: seedUrl + "loostalk.mp3"})

u2.demos.create({title: "Good Ol' Appalachia", genre: "Bluegrass", thumb_url: u2.avatar_url, audio_url: seedUrl + "hb1.mp3"})
u1.demos.create({title: "Zen Swamp", thumb_url: u1.avatar_url, audio_url: seedUrl + "sj7.mp3"})
u2.demos.create({title: "I Never Will Marry (lol both married)", genre: "Bluegrass", thumb_url: u2.avatar_url, audio_url: seedUrl + "hb2.mp3"})
u4.demos.create({title: "BOOOOOM!", thumb_url: u4.avatar_url, genre: "Metal", audio_url: seedUrl + "dooom.mp3"})

u2.demos.create({title: "Words to Sing", genre: "Folk", thumb_url: u2.avatar_url, audio_url: seedUrl + "hb4.mp3"})
u6.demos.create({title: "Night Rider", thumb_url: u6.avatar_url, genre: "Electronic", audio_url: seedUrl + "superdeath1.mp3"})
u6.demos.create({title: "Guess What Time I'm Thinking About", genre: "Electronic",thumb_url: u6.avatar_url, audio_url: seedUrl + "superdeath5.mp3"})

u7.demos.create({title: "How We Do", genre: "Rock",thumb_url: u7.avatar_url, audio_url: seedUrl + "murdersquad1.mp3"})
u7.demos.create({title: "How We Did",genre: "Rock", thumb_url: u7.avatar_url, audio_url: seedUrl + "murdersquad2.mp3"})

u8.demos.create({title: "I live in Brighton bla bla bla", genre: "Rock", thumb_url: u8.avatar_url, audio_url: seedUrl + "murdersquad3.mp3"})

u10.demos.create({title: "Demo 1", thumb_url: u10.avatar_url, genre: "Bluegrass", audio_url: seedUrl + "tfb1.mp3"})
u2.demos.create({title: "Wayfaring Stranger", thumb_url: u2.avatar_url, genre: "Folk",audio_url: seedUrl + "hb6.mp3"})
u10.demos.create({title: "Demo 2", thumb_url: u10.avatar_url,  genre: "Bluegrass", audio_url: seedUrl + "tfb2.mp3"})
u3.demos.create({title: "Wendy's Song", thumb_url: u3.avatar_url, genre: "Rock", audio_url: seedUrl + "wendy.mp3"})

u2.demos.create({title: "Tear My Stillhouse Down", thumb_url: u2.avatar_url, genre: "Country", audio_url: seedUrl + "hb3.mp3"})
u9.demos.create({title: "No, Tear MY Stillhouse Down", thumb_url: u9.avatar_url, genre: "Blues",audio_url: seedUrl + "blues.mp3"})
u10.demos.create({title: "Demo 3", thumb_url: u10.avatar_url, audio_url: seedUrl + "tfb3.mp3", genre: "Bluegrass",})
u1.demos.create({title: "Personal Property", thumb_url: u1.avatar_url, audio_url: seedUrl + "sj5.mp3", genre: "Hardcore",})
u5.demos.create({title: "He Rides By Night", thumb_url: seedUrl + "weirdo.jpg", audio_url: seedUrl + "superdeath4.mp3", genre: "Electronic"})
u3.demos.create({title: "Murder Squad Theme", thumb_url: u3.avatar_url, genre: "Jazz", audio_url: seedUrl + "murdersquadtheme.mp3"})
