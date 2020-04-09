from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, scoped_session, Session
from config import config

USER = config.db_user
PASSWORD = config.db_password
HOST = config.db_host
NAME = config.db_name

DATABASE = 'mysql://{}:{}@{}/{}?charset=utf8'.format(
    USER, PASSWORD, HOST, NAME)
ENGINE = create_engine(DATABASE, encoding='utf-8', echo=True)

session: Session = scoped_session(
    sessionmaker(
        autocommit=False,
        autoflush=False,
        bind=ENGINE
    )
)

Base = declarative_base()
Base.query = session.query_property()
