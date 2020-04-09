from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from database import Base, ENGINE


class CompanyModel(Base):
    __tablename__ = 'company'
    company_id = Column(Integer, primary_key=True)
    company_name = Column(String(255))

    lines = relationship('LineModel', back_populates='company')


class LineModel(Base):
    __tablename__ = 'line'
    line_id = Column(Integer, primary_key=True)
    line_name = Column(String(255))
    company_id = Column(Integer, ForeignKey('company.company_id'))

    company = relationship('CompanyModel', back_populates='lines')


class LineStationModel(Base):
    __tablename__ = 'line_station'
    line_id = Column(Integer, primary_key=True)
    station_id = Column(Integer, ForeignKey('station.station_id'))

    station = relationship('StationModel', back_populates='line_stations')


class StationModel(Base):
    __tablename__ = 'station'
    station_id = Column(Integer, primary_key=True)
    station_name = Column(String(255))

    line_stations = relationship('LineStationModel', back_populates='station')
