select * from notes;

select * from notes 
LIMIT 5;

select * from notes 
order by title asc;

select * from notes 
order by id asc;

select * from notes 
order by date asc;

select * from notes 
order by title desc;

select * from notes where title = '5 life lessons learned from cats';

select * from notes 
where title LIKE 'ways';

update notes 
set title = 'no wayyyyy'
where id = '1008';

insert into notes ('title', 'content') values('aweoirfaweiomf', 'aqewrioeom');
insert into notes ('title', 'content') values('', 'aqewrioeom');
insert into notes ('title', 'content') values('aweoirfaweiomf', '');

delete from notes
where id = '1005';
