import numpy as np
import math

class id:
    def __init__(self, uuid, major, minor):
        self.id = (uuid, major, minor)

class beacon:
    def __init__(self, id, x, y, txPower, N):
        self.id = id
        self.x = x
        self.y = y
        self.txPower = txPower
        self.N = N

    def sqrDistToOrg(self, b):
        return (self.x - b.x) ** 2 + (self.y - b.y) ** 2

class user:
    def __init__(self, arr):
        self.A = arr

    def distanceToBeacon(self, RSSI, beaC):
        return pow(10, (beaC.txPower - RSSI) / (10*beaC.N))

    def sqrDistToBeacon(self, RSSI, beaC):
        return pow(self.distanceToBeacon(RSSI, beaC), 2)

class linearSystem:
    def __init__(self, bList, user):
        self.bList = bList
        self.user = user
    def createMat(self):
        row = []
        org = self.bList[0]
        A =[]
        for i in range(1,len(self.bList)):
            row.append(2*(self.bList[i].x - org.x))
            row.append(2*(self.bList[i].y - org.y))
            A.append(row)
            row = []
        return A

    def matAns(self):
        org = self.bList[0]
        b = []
        for i in range(1, len(self.bList)):
            b.append(self.user.sqrDistToBeacon(self.user.A[0], org) - self.user.sqrDistToBeacon(self.user.A[i],self.bList[i]) + self.bList[i].sqrDistToOrg(org))
        return b

    def ans(self):
        A = np.array(self.createMat())
        b = np.array(self.matAns())
        return np.linalg.inv(A.transpose().dot(A)).dot(A.transpose()).dot(b) - [self.bList[0].x, self.bList[0].y]

class extendedMinMax:
    def __init__(self, bList, user):
        self.bList = bList
        self.d = []
        for i in range(len(bList)):
            self.d.append(user.distanceToBeacon(user.A[i], bList[i]))
    def rectangleVertices(self):
        p = []
        xMax = []
        xMin = []
        yMax = []
        yMin = []
        for i in range(len(self.bList)):
            xMax.append(self.bList[i].x - self.d[i])
            xMin.append(self.bList[i].x + self.d[i])
            yMax.append(self.bList[i].y - self.d[i])
            yMin.append(self.bList[i].y + self.d[i])
        p.append([np.amax(xMax), np.amax(yMax)])
        p.append([np.amax(xMax), np.amin(yMin)])
        p.append([np.amin(xMin), np.amin(yMin)])
        p.append([np.amin(xMin), np.amax(yMax)])
        return p

    def ans(self):
        w = []
        p = self.rectangleVertices()
        for i in p:
            w.append(self.weight1(i))
        x = (w[0]*p[0][0] + w[1]*p[1][0] + w[2]*p[2][0] + w[3]*p[3][0])/sum(w)
        y = (w[0]*p[0][1] + w[1]*p[1][1] + w[2]*p[2][1] + w[3]*p[3][1])/sum(w)
        return [x,y]

    def weight1(self, p):
        arr = []
        for i in range(len(self.bList)):
            arr.append(abs(self.euclidean(p, self.bList[i]) - self.d[i]))
        return 1/sum(arr)

    # def weight2(self, p):
    #     arr = []
    #     for i in range(len(self.bList)):
    #         arr.append(pow((self.euclidean(p, self.bList[i]) - self.d[i]), 2))
    #     return 1/sum(arr)

    # def weight4(self, p):
    #     arr = []
    #     for i in range(len(self.bList)):
    #         arr.append(abs(pow(self.euclidean(p, self.bList[i]),2) - pow(self.d[i], 2)))
    #     return 1/sum(arr)

    def euclidean(self, p, beaC):
        return math.sqrt(pow(beaC.x - p[0], 2) + pow(beaC.y - p[1], 2))

# if __name__ == '__main__':
#     beaconList = []
#     beaconList.append(beacon(1,0,0,-60,1))
#     beaconList.append(beacon(1,0, 1, -60, 1))
#     beaconList.append(beacon(1,1, 1, -60, 1))
#     beaconList.append(beacon(1,1, 0, -60, 1))
#     u = user([-30, -60, -61.5, -60])
#     linearModel = linearSystem(beaconList,u)
#     x = linearModel.ans()
#     print(x)
#     # emm = extendedMinMax(beaconList, u)
#     # print(emm.ans())

