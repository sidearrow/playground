from sqlalchemy import Column, Integer, Float, String, ForeignKey
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
    line_stations = relationship('LineStationModel', back_populates='line')


class LineStationModel(Base):
    __tablename__ = 'line_station'
    line_id = Column(Integer, ForeignKey('line.line_id'), primary_key=True)
    branch_line_id = Column(Integer)
    station_id = Column(Integer, ForeignKey('station.station_id'), primary_key=True)
    sort_no = Column(Integer)
    length = Column(Float)
    length_between = Column(Float)

    station = relationship('StationModel', back_populates='line_stations')
    line = relationship('LineModel', back_populates='line_stations')


class StationModel(Base):
    __tablename__ = 'station'
    station_id = Column(Integer, primary_key=True)
    station_name = Column(String(255))
    station_name_kana = Column(String(255))
    station_name_wiki = Column(String(255))
    address = Column(String(255))

    line_stations = relationship('LineStationModel', back_populates='station')
