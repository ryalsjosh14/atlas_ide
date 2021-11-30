import json


class Service:
    def __init__(self, Name, Thing_ID, Entity_ID, Space_ID, Vendor, API, Type, AppCategory, Description, Keywords):
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


class Identity_Entity:
    def __init__(self, Thing_ID, Space_ID, Name, ID, Type, Owner, Vendor, Description):
        self.Thing_ID = Thing_ID
        self.Space_ID = Space_ID
        self.Name = Name
        self.ID = ID
        self.Vendor = Vendor
        self.Owner = Owner
        self.Description = Description
        self.Type = Type


class Identity_Language:
    def __init__(self, Thing_ID, Space_ID, Network_Name, Communication_Language, IP, port):
        self.Thing_ID = Thing_ID
        self.Space_ID = Space_ID
        self.Network_Name = Network_Name
        self.Communication_Language = Communication_Language
        self.IP = IP
        self.port = port


class Identity_Thing:
    def __init__(self, Thing_ID, Space_ID, Name, Model, Vendor, Owner, Description, OS):
        self.Thing_ID = Thing_ID
        self.Space_ID = Space_ID
        self.Name = Name
        self.Model = Model
        self.Vendor = Vendor
        self.Owner = Owner
        self.Description = Description
        self.OS = OS
        self.Identity_Language = []
        self.Identity_entity = []
        self.services = []

    def add_Identity_Language(self, Identity_Language):
        self.Identity_Language.append(Identity_Language)

    def add_Identity_Entity(self, Identity_Entity):
        self.Identity_entity.append(Identity_Entity)

    def add_service(self, service):
        self.services.append(service)


# read file
with open('tester.txt', 'rb') as myfile:
    data = myfile.read()

# parse file
tweets = json.loads(data)

Identity_Things = []
for t in tweets:
    typ = t['Tweet Type']
    if typ == 'Identity_Thing':

        I_T = Identity_Thing(t['Thing ID'], t['Space ID'], t['Name'],
                             t['Model'], t['Vendor'], t['Owner'], t['Description'], t['OS'])
        Identity_Things.append(I_T)

    elif typ == 'Identity_Language':

        I_L = Identity_Language(t['Thing ID'], t['Space ID'], t['Network Name'],
                                t['Communication Language'], t['IP'], t['Port'])

        for things in Identity_Things:
            if things.Thing_ID == t['Thing ID']:
                things.add_Identity_Language(I_L)

    elif typ == "Identity_Entity":
        I_E = Identity_Entity(t['Thing ID'], t['Space ID'], t['Name'],
                              t['ID'], t['Type'], t['Owner'], t['Vendor'], t['Description'])

        for things in Identity_Things:
            if things.Thing_ID == t['Thing ID']:
                things.add_Identity_Entity(I_E)

    elif typ == "Service":
        ser = Service(t['Name'], t['Thing ID'], t['Entity ID'],
                      t['Space ID'], t['Vendor'], t['API'], t['Type'], t['AppCategory'], t['Description'], t['Keywords'])

        for things in Identity_Things:
            if things.Thing_ID == t['Thing ID']:
                things.add_service(ser)
    elif typ == 'Relationship':
        print("not completed yet")
    else:
        print("read something I dont understand")
