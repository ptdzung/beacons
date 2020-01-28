from flask import Flask, request
from flask_cors import CORS
from beacon import beacon, extendedMinMax, linearSystem, user
import default_beacons, received_beacons, pin, db
import json

app = Flask(__name__, static_folder='static', template_folder='static/build')
cors = CORS(app, resources={r"/*": {"origins": "*", "supports_credentials": True}})

mongo_connection = db.mongo_cloud()
db_name = 'BeaconMap'

mongo_db = mongo_connection.get_database(db_name)
# app_logger.info('Connecting to mongodb %s...', db_name)
# if not mongo_db.authenticate(db_user, db_pwd):
#     print('Log in failed')

@app.route('/location',methods = ['POST', 'GET'])
def location():
    if request.method == 'POST':
        location = request.json
        data = mongo_db.get_collection('Pin')

        original = default_beacons.parser(data)
        received = received_beacons.parser(location)
        u = []
        beaconList = []
        for i in received:
            if i in original:
                u.append(received.get(i))
                bea = original.get(i)
                beaconList.append(beacon(i, bea['x'], bea['y'], bea['tx'], 1))
        if len(beaconList) > 2:
            coordinate = extendedMinMax(beaconList, user(u)).ans()
            x = coordinate[0]
            y = coordinate[1]
            # print(x)
            # print(y)
            coordinates = {'x': x, 'y': y}
            print(coordinates)
            return json.dumps(coordinates)
        return '{}'
    elif request.method == 'GET':
        list = {}
        for data in mongo_db['Pin'].find({}, {'_id': 0}):
            id = data['uuid'] + data['major'] + data['minor']
            list[id] = data
        plan = {
            'path': "M0 0 L1562 0 L1562 968 L0 968 Z",
            'scale': 100,
            'x': 7.81,
            'y': 4.84,
            'beaconDatabase': list
        }
        print(plan)
        return json.dumps(plan)

@app.route('/pin',methods = ['GET', 'POST'])
def pins():
    if request.method == 'POST':
        data = request.json
        x = float(data['x'])
        y = float(data['y'])
        new = [data['uuid'], data['major'], data['minor']]

        if 0 > x or x > 20.64 or 0 > y or y > 11.3:
            return json.dumps('no')
        else:
            identical = False
            for obj in mongo_db['Pin'].find():
                compare_temp = [obj['uuid'], obj['major'], obj['minor']]
                if new == compare_temp:
                    identical = True
                    mongo_db.get_collection('Pin').replace_one(obj, data)
                    break
            if not identical:
                mongo_db.get_collection('Pin').insert_one(data)
        return ''
    elif request.method == 'GET':
        coordinates = []
        for data in mongo_db['Pin'].find({}, {'_id': 0}):
            x = float(data['x'])
            y = float(data['y'])
            arr = pin.parser(x, y)
            coordinates.append([arr[0], arr[1], data])
        return json.dumps(coordinates)

@app.route('/database', methods = ['GET','POST'])
def pinslist():
    if request.method == 'POST':
        data = request.json
        print(data)
        mongo_db['Pin'].find_one_and_delete({'uuid': data['uuid'], 'major': data['major'], 'minor': data['minor']})
        return ""
    elif request.method == 'GET':
        list = []
        for data in mongo_db['Pin'].find({}, {'_id': 0}):
            list.append(data)
        print(list)
        return json.dumps(list)

@app.route('/user', methods = ['GET', 'POST'])
def userslist():
    if request.method == 'POST':
        data = request.json
        print(data)
        if mongo_db['Users'].find_one({'username': data['username']}) == None:
            mongo_db.get_collection('Users').insert_one(data)
            return json.dumps({"sth": "obj"})
        return json.dumps({"status": "identical"})

if __name__ == '__main__':
    app.run(host = '0.0.0.0', port=5000, debug=True)