go to virtual enviroment folder parallel
source mcgve/bin/activate


Steps to be followed:-
Insatl virtualenv activate
pip install -r requirements.txt
pip install mako

sudo mysql -uroot -proot
create database in mysql with name -"mcgdb"
CREATE DATABASE mcgdb CHARACTER SET utf8;
connect mcgdb



python manage.py syncdb
python manage.py runserver


http://localhost:8000/college/collegelist

Sql query to insert data(do use POST api call written for college insert)

INSERT INTO colleges_college ( name, ranking, institute_type, city, state, pin_code, full_address, establishment, website_url, email, contact_info, infrastructure_info, college_remarks, alumni_notes, courses_id)
VALUES (
"Modern College Of Engineering",
"A+",
"Engineering" ,"Pune",
"Maharashtra",
 "411014",
"Viman Nagar",
"1990",
"www.moderncollgofengg.com",
"helpdesk@moderncollg.com",
"8097444880",
"best landscapes",
"best college",
"best college in all regards",
1);


INSERT INTO colleges_courses (name) VALUES ("Aviation Engg Course");

college_obj = College(name="Modern College Of Engineering",
                      ranking="A+",
                      rating="CSI ++",
                      institute_type="Engineering",
                      city="Pune",
                      state="Maharashtra",
                      pin_code="411014",
                      full_address="Viman Nagar Pune 411014",
                      establishment='1990',
                      website_url="www.moderncollgofengg.com",
                      email="helpdesk@moderncollg.com",
                      contact_info="8097444880",
                      infrastructure_info="best landscapes",
                      college_remarks="best college",
                      alumni_notes="best college in all regards",
                      courses=course)




insert into career_option_careerplanning values('', 'Career Planning', 'Suspendisse quis risus turpis, ut pharetra arcu. Donec adipiscing, faucibus mi ante vel augue.', 'Career Planning', "<p></p><h5><div style='color: rgb(34, 34, 34); font-family: arial, sans-serif; font-size: 12.8px; font-weight: normal; background-color: rgb(255, 255, 255);'><span id='m_744348339253968145gmail-docs-internal-guid-6a2493b3-0d54-d4a2-707e-930b18022e2e'><p dir='ltr' style='line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;'><span style='font-size: 14pt; font-family: arial; color: rgb(0, 0, 0); font-weight: 700; vertical-align: baseline; white-space: pre-wrap; background-color: transparent;'>What is a Career?</span></p><p dir='ltr' style='line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;'><span style='font-size: 11pt; font-family: arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;'>Wait; do not rush to a dictionary. The first use of the word career is the one you know - variously defined as a job, a vocation, a calling or profession. The second stands for as a goal </span><span style='font-size: 11pt; font-family: arial; color: rgb(0, 0, 0); font-weight: 700; font-style: italic; vertical-align: baseline; white-space: pre-wrap; background-color: transparent;'>and</span><span style='font-size: 11pt; font-family: arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;'> a way of life. A career is more than the sum total of all the jobs, the occupations and the professions that you undergo in life - it encompasses your personal life, your family life and your social interactions. A career is associated with a living being - you - so it may rise &amp; fall, change gears and direction with life. Your career is synonymous with you - it is the 'professor' in Prof. Mehta, the 'doctor' in Dr. Mrs. Khan, the MLA in MLA Fernandez. It dictates your state, status, stature and thus, your satisfaction in life. It affects the way people relate to you, the role you play in society - whether professionally or voluntarily. In a good career, monetary compensation becomes secondary and almost automatic.</span></p><p dir='ltr' style='line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;'><span style='font-size: 11pt; font-family: arial; color: rgb(0, 0, 0); font-weight: 700; vertical-align: baseline; white-space: pre-wrap; background-color: transparent;'>A career is a lifelong quest - to be relevant, productive, beyond financial difficulties - to be identified, to try and be ... a complete person.</span></p><p dir='ltr' style='line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;'><span style='font-size: 11pt; font-family: arial; color: rgb(0, 0, 0); font-style: italic; vertical-align: baseline; white-space: pre-wrap; background-color: transparent;'>All in all ... It is a serious matter! </span><span style='font-size: 11pt; font-family: arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;'>I have tried not to afford a concise definition of the word 'career' as many are available - my goal was to highlight the role that a career plays in life and thus lay down the premise for the fact that there is a serious need for </span><span style='font-size: 11pt; font-family: arial; color: rgb(0, 0, 0); font-weight: 700; font-style: italic; vertical-align: baseline; white-space: pre-wrap; background-color: transparent;'>'career counseling'</span><span style='font-size: 11pt; font-family: arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;'>.</span></p><div><span style='font-size: 11pt; font-family: arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;'><br></span></div></span></div><div style='color: rgb(34, 34, 34); font-family: arial, sans-serif; font-size: 12.8px; font-weight: normal; background-color: rgb(255, 255, 255);'><span id='m_744348339253968145gmail-docs-internal-guid-6a2493b3-0d56-2967-73e9-e4ee00b13ffb'><p dir='ltr' style='line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;'><span style='font-size: 10pt; font-family: arial; color: rgb(0, 0, 0); font-weight: 700; vertical-align: baseline; white-space: pre-wrap;'>This activity will help you to decide what career to choose?, or where to start?</span></p><p dir='ltr' style='line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;'><span style='font-size: 10pt; font-family: arial; color: rgb(0, 0, 0); font-weight: 700; vertical-align: baseline; white-space: pre-wrap;'>This activity will help you find out what your interests are and how they relate to the world of work.</span></p><ol style='margin-top: 0pt; margin-bottom: 0pt;'><li dir='ltr' style='margin-left: 15px; list-style-type: lower-alpha; font-size: 14pt; font-family: arial; color: rgb(0, 0, 0); font-weight: 700; vertical-align: baseline; background-color: transparent;'><p dir='ltr' style='line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;'><span style='font-size: 11pt; font-weight: 400; vertical-align: baseline; white-space: pre-wrap; background-color: transparent;'>Discover what I am good at / Step by Step Career Planning?</span></p></li><li dir='ltr' style='margin-left: 15px; list-style-type: lower-alpha; font-size: 14pt; font-family: arial; color: rgb(0, 0, 0); font-weight: 700; vertical-align: baseline; background-color: transparent;'><p dir='ltr' style='line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;'><span style='font-size: 11pt; font-weight: 400; vertical-align: baseline; white-space: pre-wrap; background-color: transparent;'>Explore Different Careers (A module explained below)</span></p></li><li dir='ltr' style='margin-left: 15px; list-style-type: lower-alpha; font-size: 14pt; font-family: arial; color: rgb(0, 0, 0); font-weight: 700; vertical-align: baseline; background-color: transparent;'><p dir='ltr' style='line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;'><span style='font-size: 11pt; font-weight: 400; vertical-align: baseline; white-space: pre-wrap; background-color: transparent;'>How can I become a ? (this will take to the Explore Career option)</span></p></li><li dir='ltr' style='margin-left: 15px; list-style-type: lower-alpha; font-size: 14pt; font-family: arial; color: rgb(0, 0, 0); font-weight: 700; vertical-align: baseline; background-color: transparent;'><p dir='ltr' style='line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;'><span style='font-size: 11pt; font-weight: 400; vertical-align: baseline; white-space: pre-wrap; background-color: transparent;'>Unconventional Careers (this will take us directly to the predefined unconventional careers)</span></p></li><li dir='ltr' style='margin-left: 15px; list-style-type: lower-alpha; font-size: 14pt; font-family: arial; color: rgb(0, 0, 0); font-weight: 700; vertical-align: baseline; background-color: transparent;'><p dir='ltr' style='line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;'><span style='font-size: 11pt; font-weight: 400; vertical-align: baseline; white-space: pre-wrap; background-color: transparent;'>Current Career Trends &nbsp;(this will take us directly to the predefined current trends in careers)</span></p></li><li dir='ltr' style='margin-left: 15px; list-style-type: lower-alpha; font-size: 14pt; font-family: arial; color: rgb(0, 0, 0); font-weight: 700; vertical-align: baseline; background-color: transparent;'><p dir='ltr' style='line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;'><span style='font-size: 11pt; font-weight: 400; vertical-align: baseline; white-space: pre-wrap; background-color: transparent;'>Success Mantra (Will share articles and methods to become successful)</span></p></li></ol></span></div><br></h5><p></p> ");
insert into career_option_careerplanning values('', 'Discover what I am good at', 'Suspendisse quis risus turpis, ut pharetra arcu. Donec adipiscing, faucibus mi ante vel augue.', 'Discover what I am good at', "<p><h5><b>General Instructions:</b> Please read the below instructions carefully while appearing for the online test</h5><ul class=' list_1'><li>Total number of questions 20. Total of 30 minutes duration will be given to attempt all 20 questions.</li><li>The clock has been set at the server and countdown timer displayed at the top of the question numer pattern will update you on remaining time to complete the exam. When the clock reached to 0 the exam will automatically close and it will display the report page where you can find all the correct and wrong question along with total marks.</li><li>The question number box at the right side of the screen represents one of the below status. Initially it is in black color when starting of the exam. Red color indicates not attempted or skipped questions; Black color indicates not visited questions. Green color indicates attempted questions.</li><li>All twenty (20) questions are multiple choices. You can navigate to any question by clicking the question number at the right side. It will navigate to respective question. By clicking next option you can see upcoming question. If you want to see answer for any question instance click on view answer at the same way click solution for explanation.</li><li>The weight age for each question is 1(one) mark. Penalty for wrong answer is 0.25. No negative marks for skipped questions or un attempted questions. To complete the test click on END TEST button. Do not refresh the page while writing the exam. For any assist please contact admin by dropping a mail which is available at contact us page. All the best. Keep visiting our website for new updates. Thanks.</li></ul><br/><a class='button_red_small' href='#/services/career-planning/online-test'>Start Test</a></p> ");
insert into career_option_careerplanning values('', 'Explore Different Careers', 'Suspendisse quis risus turpis, ut pharetra arcu. Donec adipiscing, faucibus mi ante vel augue.', 'Explore Different Careers', "<p></p><h5><div style='color: rgb(34, 34, 34); font-family: arial, sans-serif; font-size: 12.8px; font-weight: normal; background-color: rgb(255, 255, 255);'><span id='m_744348339253968145gmail-docs-internal-guid-6a2493b3-0d54-d4a2-707e-930b18022e2e'><p dir='ltr' style='line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;'><span id='docs-internal-guid-91a7008f-3234-50d9-aa75-55a6e3603967'><span style='font-size: 10.5pt; font-family: Arial; color: rgb(0, 0, 0); font-weight: 700; vertical-align: baseline; white-space: pre-wrap;'>Careers </span><span style='font-size: 10.5pt; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap;'>is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing </span></span><br></p></span></div></h5><p></p> ");

insert into career_option_careerplanning values('', 'How can I become a', 'Suspendisse quis risus turpis, ut pharetra arcu. Donec adipiscing, faucibus mi ante vel augue.', 'How can I become a', 'html content for How can I become a ');
insert into career_option_careerplanning values('', 'Unconventional Careers', 'Suspendisse quis risus turpis, ut pharetra arcu. Donec adipiscing, faucibus mi ante vel augue.', 'Unconventional Careers', 'html content for Unconventional Careers');
insert into career_option_careerplanning values('', 'Current Career Trends ', 'Suspendisse quis risus turpis, ut pharetra arcu. Donec adipiscing, faucibus mi ante vel augue.', 'Current Career Trends ', 'html content for Current Career Trends ');
insert into career_option_careerplanning values('', 'Success Mantra', 'Suspendisse quis risus turpis, ut pharetra arcu. Donec adipiscing, faucibus mi ante vel augue.', 'Success Mantra', 'html content for Success Mantra');

insert into mentoring_mentoring values('', 'Why Mentoring?','description data for Why Mentoring?','Why Mentoring?','html content for Why Mentoring?');
insert into mentoring_mentoring values('', 'How it works?','description data for How it works?','How it works?','html content for How it works?');
insert into mentoring_mentoring values('', 'Impactful Mentoring Program(IMP)','description data for Why Mentoring?','Impactful Mentoring Program(IMP)','html content for Why Mentoring?');
insert into mentoring_mentoring values('', 'Finding a Mentor','description data for Finding a Mentor','Finding a Mentor','html content ');
insert into mentoring_mentoring values('', 'What is a Mentor?','description data for What is a Mentor?','What is a Mentor?','html content for');
insert into mentoring_mentoring values('', 'Who can be a Mentor?','description data for Who can be a Mentor?','Who can be a Mentor?','html content ');
insert into mentoring_mentoring values('', 'Types of Mentors','description data for Types of Mentors','Types of Mentors','html content for Types of Mentors');
insert into mentoring_mentoring values('', 'What do Mentors achieve?','description data for What do Mentors achieve?','What do Mentors achieve?','html content for');
insert into mentoring_mentoring values('', 'How to join as a Mentor?','description data for How to join as a Mentor?','How to join as a Mentor?','html content ');
