from config import *
import csv
import cx_Oracle  

filename = "./processedData/dishes.csv"

try: 
    # Connect to Oracle database 
    db = cx_Oracle.connect(user+"/"+password+"@"+host+"/"+sid, encoding="UTF-8") 
   
    # Initialize sql cursor
    cursor = db.cursor() 

    # Open .csv file
    with open(filename, newline='') as csvfile:

      # Read .csv file
      csvreader = csv.DictReader(csvfile)
      count = 0
      for row in csvreader:
        dishId = row['dishId']
        cuisine = row['cuisine']
    
        query = "INSERT INTO Dishes (dishId, cuisine) VALUES ({dishId}, '{cuisine}')".format(dishId=dishId, cuisine=cuisine)

        # Execute sql query
        cursor.execute(query) 

        # Commit
        db.commit()

        # Print 
        count += 1
        print(dishId, cuisine, ": successfully added", count)
      
except cx_Oracle.DatabaseError as e: 
    print("There is a problem with Oracle: ", e) 
  
# Close database operation even if any erro occurs
finally: 
    if cursor: 
        cursor.close() 
    if db: 
        db.close() 