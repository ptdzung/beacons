from beacon import id

def parser(file):
    temp = {}
    for i in file.get('data'):
        identity = id(i['uuid'], i['major'], i['minor']).id
        temp[identity] = i['rssi']
    return temp
