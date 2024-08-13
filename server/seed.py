from services import app ,db
from models import User,Blog
from faker import Faker
from random import randint
faker = Faker()
with app.app_context():
    print("Deleting Customers")
    User.query.delete()
    
    new_user_1 = User(username="Ben", password_hash='bingus123!')
    new_user_2 = User(username="Nancy", password_hash='meow 246')
    new_user_3 = User(username="Justin", password_hash ='password')
    new_user_4 = User(username="Grey", password_hash = 'waterbottle')
    users = [new_user_1,new_user_2,new_user_3,new_user_4]
    db.session.add_all(users)
    db.session.commit()

    blogs = []
    for user in users:
        for i in range(10):
            nb = Blog(
                title=faker.word(),
                content=faker.paragraph(nb_sentences=5),
                user=user
            )
            blogs.append(nb)
    db.session.add_all(blogs)
    db.session.commit()