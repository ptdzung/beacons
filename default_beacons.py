import json
from beacon import id

def parser(data):
    # with open('beacons.json', 'r') as myfile:
    #     data = myfile.read()
    #
    # obj = json.loads(data)

    beaconList = {}
    for i in data.find():
        identity = id(i['uuid'], int(i['major']), int(i['minor'])).id
        tx = int(i['tx'])
        x = float(i['x'])
        y = float(i['y'])
        beaconList[identity] = {'tx': tx, 'x': x, 'y': y}
    return beaconList


