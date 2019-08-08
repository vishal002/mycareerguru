
def get_query_string(t):
    n = len(t)
    comma = ','
    bslash = "\""
    fslash = "\""
    qstr = ''
    for i in range(len(t)):
        qstr += bslash + t[i] + fslash + comma

    return qstr.strip(',')

def create_college_query(t):
    entry = (get_query_string(t))
    query = ("insert into colleges_college (name, city, state, establishment,"+
             "accreditted_by, institute_type, affiliated_to, rank_index, about,"+
             " visiting_companies, placements, facilities, faculty,"+
             " scholarship_and_finance, pin_code, email, website, phone,"+
             " full_address, avg_salary, fees, rating, other_details, naac_rating, country, fax) values ("+
             entry.encode('utf-8')+");")
    return query