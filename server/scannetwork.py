import socket
import json
import struct
import sys
import time
import pickle

MULTICAST_GROUP = '232.1.1.1'
server_address = ('', 1235)
PORT = 1235


def scanNetworkFunction():
    start_time = time.time()
    ListOfArray = []
    while((time.time()-start_time) < 60):
        sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        sock.bind(server_address)
        group = socket.inet_aton(MULTICAST_GROUP)
        mreq = struct.pack('4sL', group, socket.INADDR_ANY)
        sock.setsockopt(socket.IPPROTO_IP, socket.IP_ADD_MEMBERSHIP, mreq)
        while ((time.time()-start_time) < 60):
            data, address = sock.recvfrom(1024)
            json_obj = json.loads(data.decode('utf-8'))
            json_obj['IP_ADDRESS'] = str(address[0])
            data = json.dumps(json_obj)
            ListOfArray.append(data)
            print(address)
    ListOfArray = [i for n, i in enumerate(
        ListOfArray) if i not in ListOfArray[:n]]

    results = '['
    results = results + ','.join([str(elem) for elem in ListOfArray])
    results = results + ']'
    with open('tester.json', 'w') as fp:
        json.dump(results, fp, ensure_ascii=False, indent=4)
    print(results)

    return results


def socketConnections(IP_ADDRESS, TWEET_TYPE, THING_ID, SPACE_ID, SERVICE_NAME):
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.connect((IP_ADDRESS, 6668))
    data = {
        "Tweet Type": str(TWEET_TYPE),
        "Thing ID": str(THING_ID),
        "Space ID": str(SPACE_ID),
        "Service Name": str(SERVICE_NAME),
        "Service Inputs": "(NULL)"
    }
    result = json.dumps(data)
    sock.send(result.encode())
    return str((sock.recv(1024)).decode("utf-8"))
