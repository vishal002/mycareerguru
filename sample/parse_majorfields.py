import MySQLdb
db = MySQLdb.connect("localhost", "root", "root", "mcgdb")
cursor = db.cursor()

cursor.execute("select * from majorfields_majorfields;")
data = cursor.fetchall()

print data

with open('da_major_fields.txt', 'r') as f:
	for line in f:
		query = "insert into majorfields_majorfields (name) values (\"%s\");"%(line.strip("\n"))
		cursor.execute(query)
		print query	
		data = cursor.fetchall()
		db.commit()
		print data

db.close()
