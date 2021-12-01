import json
from flask import Flask
from scannetwork import scanNetworkFunction
from scannetwork import socketConnections
from savingApplication import ifthenwriteToFile
from savingApplication import orToFile
from savingApplication import deleteFromFile
from savingApplication import getApplications
from executeApps import execute_applications
import requests
import sys
from flask import Response
from flask import request
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

Identity_Things = []
Tweets = ""


class Service:
    def __init__(self, Name, Thing_ID, Entity_ID, Space_ID, Vendor, API, Type, AppCategory, Description, Keywords, IP_ADDRESS):
        self.Thing_ID = Thing_ID
        self.Space_ID = Space_ID
        self.Name = Name
        self.Entity_ID = Entity_ID
        self.Vendor = Vendor
        self.API = API
        self.Description = Description
        self.Type = Type
        self.AppCategory = AppCategory
        self.Keywords = Keywords
        self.IP_ADDRESS = IP_ADDRESS

    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__,
                          sort_keys=True, indent=4)


class Identity_Entity:
    def __init__(self, Thing_ID, Space_ID, Name, ID, Type, Owner, Vendor, Description, IP_ADDRESS):
        self.Thing_ID = Thing_ID
        self.Space_ID = Space_ID
        self.Name = Name
        self.ID = ID
        self.Vendor = Vendor
        self.Owner = Owner
        self.Description = Description
        self.Type = Type
        self.IP_ADDRESS = IP_ADDRESS

    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__,
                          sort_keys=True, indent=4)


class Identity_Language:
    def __init__(self, Thing_ID, Space_ID, Network_Name, Communication_Language, IP, port, IP_ADDRESS):
        self.Thing_ID = Thing_ID
        self.Space_ID = Space_ID
        self.Network_Name = Network_Name
        self.Communication_Language = Communication_Language
        self.IP = IP
        self.port = port
        self.IP_ADDRESS = IP_ADDRESS

    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__,
                          sort_keys=True, indent=4)


class Identity_Thing:
    def __init__(self, Thing_ID, Space_ID, Name, Model, Vendor, Owner, Description, OS, IP_ADDRESS):
        self.Thing_ID = Thing_ID
        self.Space_ID = Space_ID
        self.Name = Name
        self.Model = Model
        self.Vendor = Vendor
        self.Owner = Owner
        self.Description = Description
        self.OS = OS
        self.IP_ADDRESS = IP_ADDRESS
        self.Identity_Language = []
        self.Identity_entity = []
        self.services = []

    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__, indent=4)

    def add_Identity_Language(self, Identity_Language):
        self.Identity_Language.append(Identity_Language)

    def add_Identity_Entity(self, Identity_Entity):
        self.Identity_entity.append(Identity_Entity)

    def add_service(self, service):
        self.services.append(service)


@app.route("/scanNetwork")
def scanNetwork():
    global Tweets
    Tweets = scanNetworkFunction()
    return Tweets


@app.route("/socketConnection", methods=['GET'])
def socketConnection():
    IP_ADDRESS = request.args.get('IP_ADDRESS')
    TWEET_TYPE = request.args.get('TWEET_TYPE')
    THING_ID = request.args.get('THING_ID')
    SPACE_ID = request.args.get('SPACE_ID')
    SERVICE_NAME = request.args.get('SERVICE_NAME')
    return str(socketConnections(IP_ADDRESS, TWEET_TYPE, THING_ID, SPACE_ID, SERVICE_NAME))


@app.route("/getThings")
def getThings():
    global Identity_Things
    res = [json.loads(things.toJSON()) for things in Identity_Things]
    return Response(json.dumps(res),  mimetype='application/json')


@app.route("/getApps")
def getApps():
    response = getApplications()
    print(response)
    return json.dumps(response,indent=4)

@app.route("/allServices")
def allServices():
    global Identity_Things
    print(Identity_Things, file=sys.stderr)

    res = []
    for things in Identity_Things:
        for service in things.services:
            print(service.Name)
            res.append(json.loads(service.toJSON()))

    return Response(json.dumps(res),  mimetype='application/json')

# delete Applications locally


@app.route("/deleteApp", methods=['POST'])
def deleteApp():
    response = request.json
    AppName = response['AppName']
    deleteFromFile(AppName)
    return "succesfully deleted"

# execute Application Names


@app.route("/executeApp", methods=['GET'])
def executeApp():
    global Tweets
    global Identity_Thing
    response = request.json
    print(response)
    AppName = response['AppName']
    return (execute_applications(Tweets, AppName, Identity_Things))


@app.route("/if_then", methods=['POST'])
def if_then():
    global Identity_Things
    response = request.json
    AppName = response['AppName']
    if_services = response['if']
    then_services = response['then']
    ifthenwriteToFile(if_services, then_services, AppName)
    # print(AppName)
    # print(if_services)
    # print(then_services)
    return "ok"


@app.route("/or",  methods=['POST'])
def OR():
    global Identity_Things
    response = request.json
    AppName = response['AppName']
    or_services = response['or']
    orToFile(or_services, AppName)
    return "ok"


@app.route("/services/<thing_id>")
def getServices(thing_id):
    global Identity_Things
    res = []
    for things in Identity_Things:
        for service in things.services:
            if service.Thing_ID == thing_id:
                res.append(json.loads(service.toJSON()))

    return Response(json.dumps(res),  mimetype='application/json')


def sortArray(arr):
    result = []

    temp = ["Identity_Thing", "Identity_Language",
            "Identity_Entity", "Service"]
    idx = 0
    while len(arr) != len(result):
        for temp1 in arr:
            if temp1['Tweet Type'] == temp[idx]:
                result.append(temp1)

        idx += 1

    print(result)
    print(arr)
    return result


@app.route("/")
def ReadTweets():
    # read file
    # with open('tweet.json', 'r', encoding='utf-8') as myfile:
    #     data = myfile.read()
    global Tweets
    Tweets = scanNetworkFunction()
    # parse file
    # print(data)
    tweets = json.loads(Tweets)
    tweets = sortArray(tweets)

    global Identity_Things

    Identity_Things = []
    for t in tweets:
        typ = t['Tweet Type']
        if typ == 'Identity_Thing':

            I_T = Identity_Thing(t['Thing ID'], t['Space ID'], t['Name'],
                                 t['Model'], t['Vendor'], t['Owner'], t['Description'], t['OS'], t['IP_ADDRESS'])
            Identity_Things.append(I_T)

        elif typ == 'Identity_Language':

            I_L = Identity_Language(t['Thing ID'], t['Space ID'], t['Network Name'],
                                    t['Communication Language'], t['IP'], t['Port'], t['IP_ADDRESS'])

            for things in Identity_Things:
                if things.Thing_ID == t['Thing ID']:
                    things.add_Identity_Language(I_L)

        elif typ == "Identity_Entity":
            I_E = Identity_Entity(t['Thing ID'], t['Space ID'], t['Name'],
                                  t['ID'], t['Type'], t['Owner'], t['Vendor'], t['Description'], t['IP_ADDRESS'])

            for things in Identity_Things:
                if things.Thing_ID == t['Thing ID']:
                    things.add_Identity_Entity(I_E)

        elif typ == "Service":
            ser = Service(t['Name'], t['Thing ID'], t['Entity ID'],
                          t['Space ID'], t['Vendor'], t['API'], t['Type'], t['AppCategory'], t['Description'], t['Keywords'], t['IP_ADDRESS'])

            for things in Identity_Things:
                if things.Thing_ID == t['Thing ID']:
                    print(ser.Name)
                    things.add_service(ser)
        elif typ == 'Relationship':
            print("not completed yet")
        else:
            print("read something I dont understand")
    return Tweets


if __name__ == "__main__":
    app.run(debug=True, port=5000, threaded=True)
