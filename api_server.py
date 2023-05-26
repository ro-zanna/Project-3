#!/usr/bin/env python3

from sqlalchemy import Column, Integer, String, Float
from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://flask:flask@localhost:5432/project_3_db'
db = SQLAlchemy(app)

#Define schemas for the Stations, Sales, and OilDisplacement tables
class Station(db.Model):
    __tablename__ = 'stations'
    id = Column(Integer, primary_key=True)
    lat = Column(Float)
    long = Column(Float)
    station_name = Column(String)

class Sales(db.Model):
    __tablename__ = 'sales'
    id = Column(Integer, primary_key=True)
    region = Column(String)
    #category = Column(String)
    mode = Column(String)
    powertrain = Column(String)
    year = Column(Integer)
    value = Column(Integer)

class OilDisplacement(db.Model):
    __tablename__ = 'oil_displacement'
    id = Column(Integer, primary_key=True)
    region = Column(String)
    #category = Column(String)
    mode = Column(String)
    powertrain = Column(String)
    year = Column(Integer)
    value = Column(Integer)

#API endpoint to retrieve all stations as JSON
@app.route('/stations', methods=['GET'])
def get_stations():
    stations = Station.query.all()
    station_list = []
    for station in stations:
        station_data = {
            'id': station.id,
            'lat': station.lat,
            'long': station.long,
            'station_name': station.station_name
        }
        station_list.append(station_data)
    return jsonify(station_list)

#API endpoint for sales
@app.route('/sales', methods=['GET'])
def get_sales():
    sales = Sales.query.all()
    sales_list = []
    for sales_datapoint in sales:
        sales_data = {
            'region': sales_datapoint.region,
            'mode': sales_datapoint.mode,
            'powertrain': sales_datapoint.powertrain,
            'year': sales_datapoint.year,
            'value': sales_datapoint.value
        }
        sales_list.append(sales_data)
    return jsonify(sales_list)

#API endpoint for oil displacement data
@app.route('/oil_displacement', methods=['GET'])
def get_oil_displacement():
    oil_displacement = OilDisplacement.query.all()
    oil_displacement_list = []
    for oil_displacement_datapoint in oil_displacement:
        oil_displacement_data = {
            'region': oil_displacement_datapoint.region,
            'mode': oil_displacement_datapoint.mode,
            'powertrain': oil_displacement_datapoint.powertrain,
            'year': oil_displacement_datapoint.year,
            'value': oil_displacement_datapoint.value
        }
        oil_displacement_list.append(oil_displacement_data)
    return jsonify(oil_displacement_list)

if __name__ == '__main__':
    app.run()
