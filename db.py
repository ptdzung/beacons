import pymongo

def mongo_client():
    mongo = pymongo.MongoClient('192.168.1.8', 47030, connect=False, maxPoolSize=200)

    return mongo
def mongo_cloud():
    mongo = pymongo.MongoClient('mongodb+srv://dzungpt0103:Charibasa21@conera-beacons-9y8v0.mongodb.net/test?retryWrites=true&w=majority')

    return mongo

