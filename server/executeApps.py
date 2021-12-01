import socket
import json
import struct 
import sys
import time
import pickle



def execute_applications(Tweets,AppName,Identity_Things):
    #read the result file since this has all the application names
    with open('result.json','r') as f:
        apps  = json.load(f)
    #now parse the applications in the apps file(result.json)
    for k in apps:
        if k['NAME'] == AppName:
         application = k
    #now that we have the file check if empty to return 
    if(len(application) == 0):
        return "-1"
    
    result = -1

    print('we made it here')
    #get all services in server
    res = []
    for things in Identity_Things:
        for service in things.services:
            print(service.Name)
            res.append(json.loads(service.toJSON()))

    print(res)
    print("application")
    print(type(application))
    print(application)
    #now we have to continously execute the application to ensure we recieve a value 
    if 'IF' in application:

        if_statement = 0
        print('if')
        # ifelseexecution(Tweets,application)
         #this gets each individual application that would contain the important portions
        for i in application['IF']:
            #now we have to get the details pertaining to the service which will be found in res
            for k in res:
                if k['Name'] == i:
                    result = json.loads(socketConnections(k['IP_ADDRESS'],'Service Call',k['Thing_ID'],k['Space_ID'],k['Name']))
                    print('result')
                    print(result)
                    print(type(result))
                    print(type(result['Service Result']))
                    if((result['Service Result'] != "No Output") and (result['Service Result'] != "-1") and (result['Service Result'] != "0")):
                        if_statement = 1
        
        #if it evaluates to true
        if(if_statement):
            for i in application['THEN']:
            #now we have to get the details pertaining to the service which will be found in res
                for k in res:
                    if k['Name'] == i:
                        result = json.loads(socketConnections(k['IP_ADDRESS'],'Service Call',k['Thing_ID'],k['Space_ID'],k['Name']))
                        print('result')
                        print(result)
                        print(type(result))
                        print(type(result['Service Result']))
                        if((result['Service Result'] != "No Output") and (result['Service Result'] != "-1") and (result['Service Result'] != "0")):
                            return result['Service Result']
                        
        return "0"
    #this is when the application is an or statement only
    else:
        #this gets each individual application that would contain the important portions
        for i in application['OR']:
            #now we have to get the details pertaining to the service which will be found in res
            for k in res:
                if k['Name'] == i:
                    result = json.loads(socketConnections(k['IP_ADDRESS'],'Service Call',k['Thing_ID'],k['Space_ID'],k['Name']))
                    print('result')
                    print(result)
                    print(type(result))
                    print(type(result['Service Result']))
                    if((result['Service Result'] != "No Output") and (result['Service Result'] != "-1") and (result['Service Result'] != "0")):
                        return result['Service Result']
                    
        
    return "0"

#this is teh foundation of establishing a connection with the raspberry pi
def socketConnections(IP_ADDRESS,TWEET_TYPE,THING_ID,SPACE_ID,SERVICE_NAME):
    sock=socket.socket(socket.AF_INET,socket.SOCK_STREAM)
    sock.connect((IP_ADDRESS,6668))
    data = {
            "Tweet Type":str(TWEET_TYPE),
            "Thing ID":str(THING_ID),
            "Space ID":str(SPACE_ID),
            "Service Name":str(SERVICE_NAME),
            "Service Inputs":"(NULL)"
    } 
    result = json.dumps(data)
    sock.send(result.encode())
    return str((sock.recv(1024)).decode("utf-8"))
