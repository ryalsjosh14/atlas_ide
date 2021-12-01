import json
import simplejson
import os

#this will write the data to a file
def ifthenwriteToFile(if_items,then_items,name):
    data = []
    #check if file is empty
    if((os.stat('result.json').st_size!=0)): 
        with open("result.json", "r") as f:  
            data = json.load(f)
        print(data)
        for k in data:
            print(type(k))
            if name in k['NAME']:
                return -1
 

    #lets check to see if file exists

    temp = dict()
    temp['IF'] = simplifyDataToAppNameOnly(if_items)
    temp['THEN'] = simplifyDataToAppNameOnly(then_items)
    temp ['NAME'] = name

    data.append(temp)
    print(data)
    with open("result.json", 'w') as file:
         json.dump( data, file )
    return 1
#this will write the data to the or file
def orToFile(or_items,name):
    data = []
    #check if file is empty
    if((os.stat('result.json').st_size!=0)): 
        with open("result.json", "r") as f:  
            data = json.load(f)
        for k in data:
            print(type(k))
            if name in k['NAME']:
                return -1
    # data['yeet'] = "hello"
    # with open("tweetertester.json", "w") as f:  
    #     f.write(simplejson.dumps(simplejson.loads(data), indent=4, sort_keys=True))
    temp = dict()
    temp['OR'] = simplifyDataToAppNameOnly(or_items)
    temp ['NAME'] = name

    data.append(temp)
    print(data)
    with open("result.json", 'w') as file:
         json.dump(data, file )


def deleteFromFile(app_name):
    with open("result.json", "r") as f:  
            data = json.load(f)
    output_dictionary = [x for x in data if x['NAME']!=str(app_name)]
    with open("result.json", 'w') as file:
        json.dump(output_dictionary, file )


#this will only return the application datas name
def simplifyDataToAppNameOnly(array_of_items):
    temp = []
    for x in array_of_items:
        print(x)
        print(type(x))
        temp.append(x['Name'])
    print(temp)
    return temp