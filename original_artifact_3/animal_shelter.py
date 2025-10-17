from pymongo import MongoClient
from bson.objectid import ObjectId
from pprint import pprint

class AnimalShelter(object):
    """ CRUD operations for Animal collection in MongoDB """

    def __init__(self, username, password):
        # Initializing the MongoClient. This helps to 
        # access the MongoDB databases and collections.
        # This is hard-wired to use the aac database, the 
        # animals collection, and the aac user.
        # Definitions of the connection string variables are
        # unique to the individual Apporto environment.
        #
        # You must edit the connection variables below to reflect
        # your own instance of MongoDB!
        #
        # Connection Variables
        #
        USER = username
        PASS = password
        HOST = 'nv-desktop-services.apporto.com'
        PORT = 34230
        DB = 'AAC'
        COL = 'animals'
        #
        # Initialize Connection
        #
        self.client = MongoClient('mongodb://%s:%s@%s:%d' % (USER,PASS,HOST,PORT))
        self.database = self.client['%s' % (DB)]
        self.collection = self.database['%s' % (COL)]

# Complete this create method to implement the C in CRUD.
    def create(self, data=None):
        if data is not None:
            # check if data is a dictionary
            if type(data) is dict:
                # insert data into database
                result = self.database.animals.insert_one(data)
                # return true if operation was successful and false if not
                return result.acknowledged
            else:
                raise Exception("Data is not a dictionary")
        else:
            raise Exception("Nothing to save, because data parameter is empty")

# Create method to implement the R in CRUD.
    def read(self, search_data=None):
        # if there is a search_data
        if search_data is not None:
            # get cursor using search_data
            result = self.database.animals.find(search_data)
            # return results as a list
            return list(result)
        # else there is no search_data
        else:
            # get every document from collection
            result = self.database.animals.find({})
            # return results as a list
            return list(result)
        
# Create method to implement the U in CRUD
    def update(self, search_data, update_data):
        # check if search_data and update_data are dictionaries
        if (type(search_data) is dict) & (type(update_data) is dict):
            # search for matching documents with search_data
            search_list = self.read(search_data)
            # if any documents match
            if len(search_list) > 0:
                # update all matching documents with update_data
                result = self.database.animals.update_many(search_data, {"$set": update_data})
                # return the number of items updated
                return result.modified_count
            # else no documents match the search, return 0
            else:
                return 0
            
# Create method to implement the D in CRUD
    def delete(self, search_data):
        # check if search_data and update_data are dictionaries
        if type(search_data) is dict:
            # search for matching documents with search_data
            search_list = self.read(search_data)
            # if any documents match
            if len(search_list) > 0:
                # delete all matching documents
                result = self.database.animals.delete_many(search_data)
                return result.deleted_count
            else:
                return 0