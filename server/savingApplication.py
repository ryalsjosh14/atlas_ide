import json
import simplejson
import os

#this will write the data to a file
def ifthenwriteToFile(if_items,then_items,name):
    data = []
    #check if file is empty
    if((os.stat('tweetertester.json').st_size!=0)): 
        with open("tweet.json", "r") as f:  
            data = json.load(f)
        print(data)
    # data['yeet'] = "hello"
    # with open("tweetertester.json", "w") as f:  
    #     f.write(simplejson.dumps(simplejson.loads(data), indent=4, sort_keys=True))
    temp = dict()
    temp['IF'] = if_items
    temp['THEN'] = then_items
    temp ['NAME'] = name

    data.append(temp)
    print(data)
    with open("result.json", 'w') as file:
         json.dump( data, file )

def orToFile(if_items,then_items,name):
    data = []
    #check if file is empty
    if((os.stat('tweetertester.json').st_size!=0)): 
        with open("tweet.json", "r") as f:  
            data = json.load(f)
        print(data)
    # data['yeet'] = "hello"
    # with open("tweetertester.json", "w") as f:  
    #     f.write(simplejson.dumps(simplejson.loads(data), indent=4, sort_keys=True))
    temp = dict()
    temp['OR'] = if_items
    temp ['NAME'] = name

    data.append(temp)
    print(data)
    with open("result.json", 'w') as file:
         json.dump( data, file )
