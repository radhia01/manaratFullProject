create table users (id serial primary key , firstName varchar, lastName varchar , email varchar , password varchar , adress varchar , phone varchar , job varchar);
create table roles (id serial , title varchar );
create table projects (id serial , title varchar ,description varchar);
create table competences (id SERIAL PRIMARY KEY, title VARCHAR);
create table images (id serial PRIMARY KEY, url VARCHAR);
create table comments (id SERIAL PRIMARY KEY, content VARCHAR);
create table likes (id serial primary key ,id_user  int , id_project int , add CONSTRAINT )
alter table projects add  column id_user int , add CONSTRAINT projects_users_pk FOREIGN KEY(id_user) references users(id);
alter table competences add column id_user int, add CONSTRAINT competences_users_fk FOREIGN KEY(id_user) references users(id);
alter table images add column id_project int ,add CONSTRAINT images_projects_fk FOREIGN KEY(id_project) references projects(id);
alter table comments add column id_user int , add CONSTRAINT comments_users_fk FOREIGN key (id_user) references users(id);
alter table comments add column id_project int , add CONSTRAINT comments_projects_fk  FOREIGN key (id_project) references projects(id);
create table likes (id SERIAL PRIMARY KEY , id_user INT , id_project int);
alter table likes add  CONSTRAINT likes_users_fk   FOREIGN key (id_user) references  users (id);
alter table likes add  CONSTRAINT likes_projects_fk   FOREIGN key (id_project) references  projects (id);
create table message (id SERIAL PRIMARY KEY , id_sender int , id_receiver int);
alter table message add constraint message_user_fk FOREIGN KEY (id_sender) references users(id);
alter table message add CONSTRAINT message_user_fk2 FOREIGN KEY(id_receiver) references users(id);
alter table message add column content VARCHAR;